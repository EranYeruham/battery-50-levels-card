# Battery 50 Levels Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE)

A custom Home Assistant Lovelace card that displays battery percentage with 50 discrete levels for precise visualization.

![Battery Card Example](screenshot.png)

## Features

✨ **50 Discrete Levels** - Each level represents 2% for precise battery status  
🎨 **Customizable Colors** - Define color thresholds for different battery levels  
📏 **Configurable Size** - Adjust height, width, and cap width  
🔢 **Decimal Precision** - Show percentage with 0-2 decimal places  
🎯 **Responsive Design** - Adapts to your dashboard theme  

## Installation

### HACS (Recommended)

1. Open HACS
2. Go to "Frontend"
3. Click "+" and search for "Battery 50 Levels Card"
4. Click "Install"
5. Add the following to your Lovelace resources (or restart Home Assistant):
```yaml
url: /hacsfiles/battery-50-levels-card/battery-50-levels-card.js
type: module
```

6. Refresh your browser

### Manual Installation

1. Download `battery-50-levels-card.js` from the [latest release](https://github.com/EranYeruham/battery-50-levels-card/releases)
2. Copy it to `<config>/www/battery-50-levels-card/battery-50-levels-card.js`
3. Add the following to your Lovelace resources:
```yaml
url: /local/battery-50-levels-card/battery-50-levels-card.js
type: module
```

4. Refresh your browser

## Configuration

### Minimal Configuration
```yaml
type: custom:battery-50-levels-card
entity: sensor.battery_percentage
```

### Full Configuration
```yaml
type: custom:battery-50-levels-card
entity: sensor.battery_percentage
name: Solar Battery
decimals: 2
height: 400px
width: 100px
cap_width: 40px
show_value: true
colors:
  "0": "#d32f2f"
  "10": "#ff5722"
  "20": "#ff9800"
  "30": "#ffc107"
  "40": "#ffeb3b"
  "50": "#cddc39"
  "60": "#8bc34a"
  "70": "#4caf50"
  "80": "#2e7d32"
  "90": "#1b5e20"
  "100": "#0d5016"
```

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | **Required** | Entity ID of battery percentage sensor |
| `name` | string | Entity name | Display name for the battery |
| `decimals` | number | `0` | Number of decimal places (0-2) |
| `height` | string | `300px` | Height of battery body |
| `width` | string | `80px` | Width of battery body |
| `cap_width` | string | `30px` | Width of battery cap (top) |
| `show_value` | boolean | `true` | Show percentage text below battery |
| `colors` | object | *see below* | Color thresholds |

### Default Colors
```yaml
colors:
  "0": "#d32f2f"    # Red (0-10%)
  "10": "#ff5722"   # Deep orange
  "20": "#ff9800"   # Orange
  "30": "#ffc107"   # Amber
  "40": "#ffeb3b"   # Yellow
  "50": "#cddc39"   # Lime
  "60": "#8bc34a"   # Light green
  "70": "#4caf50"   # Green
  "80": "#2e7d32"   # Dark green
  "90": "#1b5e20"   # Very dark green
  "100": "#0d5016"  # Forest green
```

## Examples

### Solar Battery
```yaml
type: custom:battery-50-levels-card
entity: sensor.solar_battery_percentage
name: Solar System
decimals: 1
height: 350px
width: 90px
```

### Small Battery Indicator
```yaml
type: custom:battery-50-levels-card
entity: sensor.phone_battery
height: 200px
width: 60px
cap_width: 25px
show_value: false
```

### Custom Color Scheme (Blue Theme)
```yaml
type: custom:battery-50-levels-card
entity: sensor.battery_level
colors:
  "0": "#ff0000"
  "20": "#ff6600"
  "40": "#ffcc00"
  "60": "#00ccff"
  "80": "#0066ff"
  "100": "#0033cc"
```

## Troubleshooting

### Card not showing

- Clear browser cache (Ctrl+Shift+R)
- Verify entity ID exists and has numeric value
- Check browser console (F12) for errors
- Ensure resource is properly loaded in Configuration → Lovelace Dashboards → Resources

### Colors not working

- Ensure color values are valid hex codes
- Check that threshold numbers are strings in quotes: `"50"` not `50`

### Custom element doesn't exist error

- Hard refresh browser (Ctrl+Shift+R)
- Verify the resource URL is correct
- Restart Home Assistant

## Contributing

Contributions welcome! Please open an issue or pull request.

## License

MIT License - See [LICENSE](LICENSE)

## Support

If you find this card useful, please ⭐ star the repository!

For issues and feature requests: [GitHub Issues](https://github.com/YOUR_USERNAME/battery-50-levels-card/issues)

[releases-shield]: https://img.shields.io/github/release/YOUR_USERNAME/battery-50-levels-card.svg
[releases]: https://github.com/YOUR_USERNAME/battery-50-levels-card/releases
[license-shield]: https://img.shields.io/github/license/YOUR_USERNAME/battery-50-levels-card.svg
