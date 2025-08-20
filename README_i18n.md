# Internationalization (i18n) System for Presentation

This presentation now supports multiple languages through a comprehensive internationalization system.

## Features

- **Dual Language Support**: English and Spanish
- **Language Persistence**: Remembers your language choice using localStorage
- **Dynamic Content Switching**: All text content updates instantly when switching languages
- **Easy Maintenance**: Centralized translation management
- **Fallback System**: Gracefully handles missing translations

## How to Use

### 1. Language Switcher
The language switcher is located in the top-right corner of the presentation:
- **EN**: Switch to English
- **ES**: Switch to Spanish

### 2. Adding New Content
To add new translatable content:

1. **Add data attributes to HTML elements:**
   ```html
   <h2 data-i18n="slide5.title">Why COBOL is the Ultimate Flex</h2>
   <p data-i18n="slide5.description">COBOL programmers are basically digital unicorns</p>
   ```

2. **Add translations to i18n.js:**
   ```javascript
   en: {
       slide5: {
           title: "Why COBOL is the Ultimate Flex",
           description: "COBOL programmers are basically digital unicorns"
       }
   },
   es: {
       slide5: {
           title: "Por Qué COBOL es el Flex Definitivo",
           description: "Los programadores COBOL son básicamente unicornios digitales"
       }
   }
   ```

### 3. Translation Keys
Use dot notation for nested translations:
- `slide1.title` → First slide title
- `navigation.previous` → Previous button text
- `slide4.stat1.label` → First statistic label

## File Structure

- **`i18n.js`**: Contains all translations and i18n logic
- **`retro_presentation.html`**: Main presentation with data-i18n attributes
- **`test_i18n.html`**: Test page to verify translations
- **`script.js`**: Updated to integrate with i18n system

## Adding New Languages

To add a new language (e.g., French):

1. **Add language object to i18n.js:**
   ```javascript
   fr: {
       navigation: {
           previous: "← Précédent",
           next: "Suivant →",
           // ... more translations
       },
       // ... slide translations
   }
   ```

2. **Add language button to HTML:**
   ```html
   <button class="lang-btn" data-lang="fr" onclick="i18n.setLanguage('fr')">FR</button>
   ```

3. **Update language switcher styles if needed**

## Technical Details

### Core Functions
- `i18n.setLanguage(lang)`: Switch to specified language
- `i18n.getText(key)`: Get translated text for a key
- `i18n.updateContent()`: Update all page content
- `i18n.currentLanguage()`: Get current language

### How It Works
1. **Initialization**: System loads with saved language preference or defaults to English
2. **Content Update**: When language changes, all elements with `data-i18n` attributes are updated
3. **Persistence**: Language choice is saved to localStorage
4. **Fallback**: Missing translations fall back to English

### Performance
- Translations are loaded once and cached
- Content updates are efficient and only modify necessary elements
- No page reloads required for language switching

## Testing

Use `test_i18n.html` to test the i18n system:
1. Open the test page
2. Click language buttons to see content change
3. Verify all text elements update correctly
4. Check that language preference persists

## Best Practices

1. **Use descriptive keys**: `slide3.hopperIdea` instead of `slide3.text1`
2. **Group related translations**: Keep slide content together
3. **Maintain consistency**: Use similar structure across languages
4. **Test thoroughly**: Verify translations in both languages
5. **Handle HTML carefully**: Some translations may contain HTML tags

## Troubleshooting

### Content Not Updating
- Check that elements have `data-i18n` attributes
- Verify translation keys exist in i18n.js
- Ensure i18n.js is loaded before script.js

### Language Not Persisting
- Check browser localStorage support
- Verify localStorage key: `presentation-language`

### Missing Translations
- Add missing keys to both language objects
- Check console for error messages
- Use fallback system for temporary missing translations

## Future Enhancements

- **Auto-detection**: Detect user's browser language
- **RTL Support**: Right-to-left language support
- **Pluralization**: Handle different plural forms
- **Context-aware**: Different translations based on context
- **Translation Management**: External translation files

## Contributing

When adding new content or translations:
1. Add data-i18n attributes to HTML
2. Add translations to both English and Spanish
3. Test language switching
4. Update documentation if needed 