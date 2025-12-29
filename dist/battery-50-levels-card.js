class Battery50LevelsCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity) {
      throw new Error('Please define an entity');
    }
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    
    const entityId = this.config.entity;
    const stateObj = hass.states[entityId];
    
    if (!stateObj) {
      this.innerHTML = `<ha-card><div style="padding: 16px;">Entity ${entityId} not found</div></ha-card>`;
      return;
    }

    const state = parseFloat(stateObj.state) || 0;
    const name = this.config.name || stateObj.attributes.friendly_name;
    const showValue = this.config.show_value !== false;
    const decimals = this.config.decimals || 0;
    const height = this.config.height || '300px';
    const width = this.config.width || '80px';
    const capWidth = this.config.cap_width || '30px';
    
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.style.cursor = 'pointer';
      
      card.innerHTML = `
        <div class="card-content">
          <div class="battery-container">
            <div class="battery-name">${name}</div>
            <div class="battery-wrapper">
              <div class="battery-cap" style="width: ${capWidth};"></div>
              <div class="battery-body" style="width: ${width}; height: ${height};">
                <div class="battery-levels"></div>
              </div>
            </div>
            ${showValue ? '<div class="battery-value"></div>' : ''}
          </div>
        </div>
        <style>
          .battery-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px;
          }
          .battery-name {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 12px;
            color: var(--primary-text-color);
          }
          .battery-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .battery-cap {
            height: 6px;
            background: var(--primary-text-color);
            border-radius: 2px 2px 0 0;
            margin-bottom: 2px;
          }
          .battery-body {
            border: 3px solid var(--primary-text-color);
            border-radius: 6px;
            padding: 4px;
            background: var(--card-background-color);
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
          }
          .battery-levels {
            position: absolute;
            top: 4px;
            bottom: 4px;
            left: 4px;
            right: 4px;
            display: flex;
            flex-direction: column-reverse;
            gap: 1px;
          }
          .battery-level {
            width: 100%;
            flex: 1;
            min-height: 2px;
            border-radius: 1px;
            transition: background-color 0.3s ease;
          }
          .battery-level.empty {
            background: transparent;
            border: 0.5px solid rgba(128, 128, 128, 0.15);
          }
          .battery-value {
            margin-top: 12px;
            font-size: 24px;
            font-weight: bold;
            color: var(--primary-text-color);
          }
        </style>
      `;
      
      const levelsContainer = card.querySelector('.battery-levels');
      for (let i = 0; i < 50; i++) {
        const level = document.createElement('div');
        level.className = 'battery-level empty';
        levelsContainer.appendChild(level);
      }
      
      this.appendChild(card);
      this.content = card;
      
      // Add click handler to show entity history
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        const event = new CustomEvent('hass-more-info', {
          bubbles: true,
          composed: true,
          detail: { entityId: this.config.entity }
        });
        this.dispatchEvent(event);
      });
    }

    // Update levels
    const filledLevels = Math.round((state / 100) * 50);
    const levels = this.content.querySelectorAll('.battery-level');
    
    levels.forEach((level, index) => {
      if (index < filledLevels) {
        level.classList.remove('empty');
        level.style.backgroundColor = this.getColor(state);
      } else {
        level.classList.add('empty');
        level.style.backgroundColor = '';
      }
    });

    // Update value
    if (showValue) {
      const valueElement = this.content.querySelector('.battery-value');
      if (valueElement) {
        valueElement.textContent = `${state.toFixed(decimals)}%`;
      }
    }
  }

  getColor(percentage) {
    const colors = this.config.colors || {
      0: '#d32f2f',
      10: '#ff5722',
      20: '#ff9800',
      30: '#ffc107',
      40: '#ffeb3b',
      50: '#cddc39',
      60: '#8bc34a',
      70: '#4caf50',
      80: '#2e7d32',
      90: '#1b5e20',
      100: '#0d5016'
    };

    let color = colors[0] || '#d32f2f';
    const thresholds = Object.keys(colors).map(Number).sort((a, b) => a - b);
    
    for (const threshold of thresholds) {
      if (percentage >= threshold) {
        color = colors[threshold];
      }
    }
    
    return color;
  }

  getCardSize() {
    return 4;
  }
}

customElements.define('battery-50-levels-card', Battery50LevelsCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'battery-50-levels-card',
  name: 'Battery 50 Levels Card',
  description: 'A battery card with 50 discrete levels',
  preview: true,
  documentationURL: 'https://github.com/EranYeruham/battery-50-levels-card'
});

console.info(
  `%c BATTERY-50-LEVELS-CARD %c v1.0.5 `,
  'color: white; background: green; font-weight: 700;',
  'color: green; background: white; font-weight: 700;'
);
