
<p align="center">
  <img src="https://media.licdn.com/dms/image/v2/C4E0BAQEUu2uBOwIcTQ/company-logo_200_200/company-logo_200_200/0/1651738810220/scalara_logo?e=1756944000&v=beta&t=Yq3VZD1X56ODr_Nm018G_NZIAHDnvNOBGYd9YzpL-GE" alt="Scalarla Logo" width="120" />
</p>

# 📘 **Dokumentation zur Angular Signal-basierten (Zoneless) ImmoManager-Anwendung**

---

## 📄 Inhaltsverzeichnis

- [🔧 Architekturübersicht](#-architekturübersicht)
- [🧱 Komponentenstruktur](#-komponentenstruktur)
- [💡 Reaktive Formulare mit Signals](#-reaktive-formulare-mit-signals)
- [🧩 Wiederverwendbare Eingabekomponenten](#-wiederverwendbare-eingabekomponenten)
- [📦 Autocomplete & Google Places](#-autocomplete--google-places)
- [🎨 UI & Sidebar Styling](#-ui--sidebar-styling)
- [📐 Validierungen & UX-Verhalten](#-validierungen--ux-verhalten)
- [✅ Fazit](#-fazit)

---

## 🔧 Architekturübersicht

Die Anwendung wurde mit modernen Angular 20 Features umgestellt. In der letzten Presentation von Angular 20 wurde den Entwicklern eine **Zoneless** Architektur empfohlen:

- **Zoneless** Betrieb ohne `zone.js`.
- Verwendung von **Signals**, **Computed Signals** & **Effects** für State-Management.
- **TailwindCSS** für ein modernes UI-Design.
- **Stand-alone Komponenten** zur besseren Wiederverwendbarkeit.

---

## 🧱 Komponentenstruktur


Jede Detail-Komponente (`property`, `contact`, `relation`) verwaltet ihre eigenen Signale und Formulare. Validierungen und Änderungen erfolgen live.
Jedes Feature hat ihren eigenen Folder mit dem entsprechenden Komponenten-Logic.
Wiederverwendbare Komponenten werden im `shared` Folder definiert.
Die daten werden von Services geladen.

---

## 💡 Reaktive Formulare mit Signals

Beispiel für ein Form-Control mit Signalbindung:

```ts
description = signal('');
effect(() => {
  const value = description();
  // Trigger bei Änderung
});
```

In der Komponente erfolgt `@Input() inputValue: WritableSignal<...>` zur Übergabe.

---

## 🧩 Wiederverwendbare Eingabekomponenten

### ✅ `app-input`

```ts
@Input() type: 'text' | 'date' | 'select' | 'tags';
@Input() inputValue: WritableSignal<string | number | string[]>;
@Input() options?: string[];
```

### Unterstützung für:

- `text`, `date`, `select`, `tags`
- `select`: Dropdown mit Optionen
- `date`: für Zeiträume
- Validation-Message: Wird dynamisch angezeigt mit `touched` Signal

---

## 📦 Autocomplete & Google Places

**`address-input`** verwendet `google.maps.places.Autocomplete`:

- Selektiert eine Adresse
- Emit `addressSelected`-Event mit strukturierter Adresse:
  - `street`, `city`, `zipCode`, `country`
- Integration in `property-detail` über `onAddressSelected()`.

---

## 🎨 UI & Sidebar Styling

### Sidebar basiert auf folgendem Layout:

- Farben:
  - Hintergrund: `#EBEEE8`
  - Akzentfarbe: `#8CC63F` (Grün aus Screenshot)
- Tailwind-Klassen: `hover:bg-green-500`, `font-semibold`, `rounded-md`
- Aktiver Zustand:
  ```ts
  isActive(route: string): boolean {
    return this.router.url === route;
  }
  ```

Icons: `material-symbols-outlined` verwendet.

---

## 📐 Validierungen & UX-Verhalten

- Live-Validation via `required`, property.
- Visuelles Feedback via Tailwind (`border-red-500`, `text-red-600`)
- Fehler erst nach User-Eingriff (`touched` Signal)

---

## ✅ Fazit

- Die App verwendet modernste Angular-Konzepte.
- **Forms** sind vollständig signalbasiert und ohne Template-Driven Code.
- Tailwind bietet konsistentes Design über alle Komponenten hinweg.

