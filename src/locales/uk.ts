import { en } from './en';

export const uk: typeof en = {
  common: {
    appName: "VibeDev Tools",
    appTagline: "Високопродуктивні веб-утиліти для розробників та дизайнерів",
    clientSideNotice: "100% Client-Side • Ваші дані НЕ залишають ваш браузер",
    copy: "Копіювати",
    copied: "Скопійовано в буфер обміну!",
    download: "Завантажити",
    clear: "Очистити",
    reset: "Скинути",
    formatting: "Форматувати",
    minifying: "Мініфікувати",
    searchPlaceholder: "Пошук інструментів (SVG, JSON, REM, Glassmorphism)...",
    allTools: "Усі інструменти",
    exploreTools: "Огляд інструментів",
    tryNow: "Спробувати",
    faqTitle: "Часті запитання (FAQ)",
    adsLabel: "Реклама",
    sponsoredSlot: "Спонсорська зона AdSense",
    noToolsFound: "За вашим запитом інструментів не знайдено",
    clearSearch: "Очистити пошуковий запит",
  },
  nav: {
    home: "Головна",
    tools: "Інструменти",
    svgCleaner: "SVG Cleaner",
    jsonToTs: "JSON в TS / Zod",
    pxToRem: "PX в REM",
    cssShadow: "CSS Shadow & Glass",
    about: "Про проект",
    contact: "Контакти",
    privacy: "Політика конфіденційності",
  },
  footer: {
    legalTitle: "Інформація та Правила",
    taglineDesc: "Високопродуктивні веб-утиліти для розробників та дизайнерів. Створено без зовнішніх серверів для забезпечення 100% приватності, блискавичної швидкості та максимальної продуктивності.",
    copyright: "© 2026 VibeDev Tools. Усі права захищені. Відповідність вимогам Google AdSense.",
    craftedWith: "Зроблено з",
    forDevs: "для Веб-розробників та Дизайнерів",
  },
  hero: {
    badge: "⚡ Робота в браузері • Нульова затримка",
    titlePrefix: "Сучасні мікро-інструменти для",
    titleHighlight: "Розробників та Дизайнерів",
    description: "Прискорюйте свою роботу за допомогою супершвидких клієнтських утиліт. Очищуйте SVG, генеруйте типи TypeScript та Zod схеми, розраховуйте адаптивні REM шрифти та створюйте ефекти Glassmorphism.",
    privacyGuarantee: "Гарантія приватності: Усі обчислення виконуються локально у вашому веб-браузері.",
  },
  toolsList: {
    svgCleaner: {
      title: "SVG Cleaner & DataURI Converter",
      desc: "Мініфікуйте SVG, видаляйте непотрібні коментарі, атрибути та конвертуйте у DataURI чи React TSX компоненти.",
      badge: "Популярне",
    },
    jsonToTs: {
      title: "JSON to TypeScript & Zod Generator",
      desc: "Перетворюйте JSON у безпечні TypeScript інтерфейси, типи та готові Zod схеми валидації.",
      badge: "TypeScript",
    },
    pxToRem: {
      title: "PX to REM & Fluid Typography Calculator",
      desc: "Конвертуйте пікселі у REM/EM та генеруйте CSS clamp() формули для адаптивної типографіки.",
      badge: "CSS / Layout",
    },
    cssShadow: {
      title: "CSS Shadow & Glassmorphism Generator",
      desc: "Створюйте багаторівневі CSS тіні та ефекти матового скла с живим прев'ю та Tailwind CSS експортом.",
      badge: "UI / UX",
    }
  },
  svgCleanerTool: {
    title: "SVG Cleaner & DataURI Converter",
    subtitle: "Оптимізуйте векторну графіку, очищуйте метадані та експортуйте clean JSX чи Data URI.",
    dropzoneText: "Перетягніть ваш .svg файл сюди або натисніть для вибору",
    pasteLabel: "Або вставте raw SVG код сюди:",
    cleanOptions: "Налаштування очищення",
    removeComments: "Видалити XML коментарі",
    removeMetadata: "Видалити метадані та теги title",
    removeDimensions: "Видалити width/height (адаптивний viewBox)",
    minifyCode: "Мініфікувати SVG XML",
    prettifyCode: "Форматувати XML",
    camelCaseAttrs: "Конвертувати атрибути у React camelCase",
    cleanedOutput: "Оптимізований SVG",
    dataUriOutput: "Data URI (Base64 / UTF-8)",
    reactComponentOutput: "React JSX / TSX Компонент",
    statsOriginal: "Початковий розмір",
    statsCleaned: "Оптимізований розмір",
    statsSaved: "Економія",
    seoTitle: "Чому оптимізація SVG важлива для швидкості сайту",
    seoContent1: "Векторна графіка Scalable Vector Graphics (SVG) стала стандартом для іконок, логотипів та ілюстрацій у сучасних веб-додатках. Однак графічні редактори (Adobe Illustrator, Figma, Inkscape, Sketch) додають у файли значну кількість зайвої інформації: метадані, теги генераторів, історію редагування, стилі за замовчуванням та розлогі коментарі.",
    seoContent2: "Використання неоптимізованих SVG збільшує розмір бандлу, погіршує показники Google PageSpeed Insights та уповільнює рендеринг сторінки. Наш онлайн SVG Cleaner аналізує векторний код безпосередньо у браузері за допомогою нативних Web API, безпечно видаляючи непотрібні атрибути без втрати якості.",
    seoContent3: "Крім того, швидка конвертація векторних елементів у React TSX компоненти або SVG Data URI дозволяє легко інтегрувати їх у стилі CSS background-image або дизайн-системи без додаткових HTTP-запитів. Усі операції проходять 100% локально в браузері.",
    features: [
      "Видаляє метадані Adobe Illustrator, Figma та Inkscape.",
      "Конвертує атрибути XML у camelCase властивості для React TSX.",
      "Кодує векторний код у чисті Base64 / UTF-8 Data URI.",
      "Зменшує розмір SVG до 60% без втрати візуальної якості."
    ],
    faq: [
      {
        question: "Чи відправляються мої SVG файли на сервер?",
        answer: "Ні. SVG Cleaner використовує нативний DOMParser API прямо у вашому браузері. Усі файли обробляються 100% локально."
      },
      {
        question: "Навіщо видаляти атрибути width та height з SVG?",
        answer: "Видалення явних width та height при збереженні viewBox дозволяє SVG плавно масштабуватися через CSS."
      },
      {
        question: "У чому перевага конвертації SVG у DataURI?",
        answer: "DataURI можна вставляти безпосередньо у CSS background-image або теги img, уникаючи додаткових HTTP-запитів."
      },
      {
        question: "Чи готовий згенерований React TSX компонент до продакшену?",
        answer: "Так! Усі CSS-атрибути типу stroke-width та fill-rule автоматично конвертуються у camelCase (strokeWidth, fillRule)."
      }
    ]
  },
  jsonToTsTool: {
    title: "JSON to TypeScript & Zod Generator",
    subtitle: "Миттєво конвертуйте JSON відповіді у суворі TypeScript інтерфейси та Zod схеми валидації.",
    inputLabel: "Вхідні дані JSON:",
    outputTsLabel: "Згенеровані TypeScript типи:",
    outputZodLabel: "Згенерована Zod схема валидації:",
    rootTypeName: "Назва кореневого типу:",
    useInterface: "Використовувати 'interface' замість 'type'",
    exportTypes: "Додавати ключеве слово 'export'",
    makeOptional: "Авто-детекція опціональних полів",
    invalidJson: "Некоректний синтаксис JSON. Перевірте вхідні дані.",
    validJson: "Синтаксис JSON успішно перевірено.",
    downloadFileName: "types.ts",
    seoTitle: "Автоматична генерація типів та схем для TypeScript",
    seoContent1: "У сучасній розробці на JavaScript та TypeScript робота з REST API, GraphQL або вебхуками вимагає чіткої типізації. Ручне написання TypeScript інтерфейсів для складних вкладених JSON відповідей є довгим та схильним до помилок процесом, що нерідко призводить до багів у production.",
    seoContent2: "Наш конвертер JSON у TypeScript та Zod рекурсивно аналізує структуру JSON, визначаючи примітивні типи (string, number, boolean, null), масиви, об'єднання (unions) та глибоко вкладені об'єкти. Він миттєво створює зрозумілі TypeScript типи та схеми для бібліотеки Zod.",
    seoContent3: "Завдяки комбінації статичної типізації TypeScript та валидації під час виконання (runtime validation) через Zod, ви зможете гарантувати безпеку даних у додатку. Усі обчислення відбуваються 100% на стороні клієнта, зберегаючи повну приватність вашого коду.",
    features: [
      "Підтримує вкладені об'єкти JSON, масиви та примітивні типи.",
      "Генерує схеми рантайм-валідації для бібліотеки Zod.",
      "Гнучке налаштування назви кореневого типу та формату interface / type.",
      "100% приватно: ідеально для конфіденційних JSON відповідей API."
    ],
    faq: [
      {
        question: "Що таке Zod і навіщо він генерується разом із TypeScript типами?",
        answer: "Типи TypeScript існують лише під час компіляції. Zod забезпечує валідацію під час виконання (runtime), гарантуючи відповідність даних."
      },
      {
        question: "Чи можу я генерувати interface замість type?",
        answer: "Так! Увімкніть опцію 'Використовувати interface замість type' у панелі налаштувань."
      },
      {
        question: "Як працює визначення типів масивів?",
        answer: "Парсер аналізує елементи масиву та автоматично виводить примітивні або вкладені типи об'єктів."
      },
      {
        question: "Чи є обмеження на розмір JSON?",
        answer: "Оскільки всі обчислення відбуваються у браузері, інструмент легко обробляє великі JSON за мілісекунди."
      }
    ]
  },
  pxToRemTool: {
    title: "PX to REM & Fluid Typography Calculator",
    subtitle: "Переводьте пикселі у REM/EM та створюйте формули CSS clamp() для адаптивної типографіки.",
    baseFontSize: "Базовий розмір шрифту (px):",
    pxInput: "Значення в пікселях (px):",
    remOutput: "Значення в REM:",
    emOutput: "Значення в EM:",
    fluidTitle: "Калькулятор адаптивної типографіки (Fluid Typography)",
    minPx: "Мін. розмір шрифту (px):",
    maxPx: "Макс. розмір шрифту (px):",
    minViewport: "Мін. ширина екрана (px):",
    maxViewport: "Макс. ширина екрана (px):",
    clampFormula: "Згенерована CSS clamp() формула:",
    tailwindClass: "Значення для Tailwind CSS:",
    lookupTableTitle: "Таблиця швидкого відповідності PX ↔ REM",
    seoTitle: "Адаптивна типографіка з REM та CSS clamp()",
    seoContent1: "Фіксовані пікселі (`px`) обмежують адаптивність та доступність (accessibility) сайту. Користувачі з масштабуванням шрифту в браузері стикаються з незручностями, якщо інтерфейс побудований виключно на піксельних значеннях.",
    seoContent2: "Відносні одиниці `rem` (root em) масштабуються відносно базового розміру HTML (зазвичай 16px). Переведення відступів, полів та розмірів шрифтів у REM забезпечує пропорційне відображення сайту на будь-яких пристроях.",
    seoContent3: "Використання сучасної функції CSS `clamp(MIN, VAL, MAX)` дозволяє налаштувати плавну типографіку, яка авто-масштабується залежно від ширини екрана. Наш калькулятор швидко розраховує точні математичні формули та готові класси Tailwind CSS.",
    features: [
      "Розраховує точні значення REM/EM на основі базового розміру шрифту.",
      "Генерує динамічні CSS clamp(min, preferred, max) формули.",
      "Створює готові утилітарні класи для Tailwind CSS.",
      "Включає таблицю швидкого відповідності поширених значення PX ↔ REM."
    ],
    faq: [
      {
        question: "Який базовий розмір шрифту за замовчуванням у браузерах?",
        answer: "Більшість браузерів використовують базовий розмір 16px (1rem = 16px). Ви можете змінити його у калькуляторі."
      },
      {
        question: "Чому варто вибирати REM замість PX?",
        answer: "Одиниці REM адаптуються до налаштувань доступності та масштабу шрифту в браузері користувача."
      },
      {
        question: "Як працює CSS clamp()?",
        answer: "CSS clamp(MIN, VAL, MAX) обмежує значення між мінімумом та максимумом, створюючи плавно масштабовану типографіку."
      },
      {
        question: "Чи сумісні значення з Tailwind CSS?",
        answer: "Так, ми генеруємо класи Tailwind типу text-[clamp(1rem,2vw,2.5rem)] для швидкого копіювання."
      }
    ]
  },
  cssShadowTool: {
    title: "CSS Shadow & Glassmorphism Generator",
    subtitle: "Створюйте об'ємні багаторівневі тіні та ефекти матового скла Glassmorphism.",
    modeShadow: "Генератор CSS тіней",
    modeGlass: "Генератор Glassmorphism",
    presetLabel: "Готові пресети:",
    offsetX: "Зсув X (px):",
    offsetY: "Зсув Y (px):",
    blurRadius: "Радіус розмиття (px):",
    spreadRadius: "Розтягнення (px):",
    shadowColor: "Колір тіні та прозорість:",
    insetShadow: "Внутрішня тінь (Inset)",
    glassBgOpacity: "Прозорість фону:",
    glassBlur: "Розмиття фону (Backdrop Blur px):",
    glassBorderOpacity: "Прозорість рамки:",
    glassBorderWidth: "Товщина рамки (px):",
    previewBoxTitle: "Інтерактивний живий перегляд",
    outputCss: "Чистий CSS код:",
    outputTailwind: "Класи Tailwind CSS:",
    seoTitle: "Сучасний дизайн інтерфейсів: Тіні та Ефект Матового Скла",
    seoContent1: "Візуальна ієрархія та глибина є основою сучасних дизайн-систем. Відмовляючись від пласких грубих тіней, сучасні інтерфейси (такі як iOS, Vercel, Linear) використовують багаторівневі м'які тіні та ефекти матового напівпрозорого стекла.",
    seoContent2: "Glassmorphic ефект базується на CSS властивості `backdrop-filter: blur(...)` у поєднанні з напівпрозорим фоном та світловідбиваючою рамкою. Це створює відчуття преміального, об'ємного інтерфейсу.",
    seoContent3: "Наш генератор дозволяє точно налаштувати радіуси, прозорість, розмиття фону та миттєво згенерувати чистий CSS або Tailwind CSS класи для вашого проекту.",
    features: [
      "Налаштування багаторівневих CSS тіней за допомогою слайдерів.",
      "Генерація ефекту матового скла Glassmorphism з backdrop-blur.",
      "Інтерактивний темний та світлий фон для перегляду.",
      "Миттєве копіювання чистих CSS властивостей та класів Tailwind CSS."
    ],
    faq: [
      {
        question: "Що таке Glassmorphism у веб-дизайні?",
        answer: "Glassmorphic ефект поєднує напівпрозорий фон, размиття backdrop-filter та тонку світловідбиваючу рамку."
      },
      {
        question: "Які браузери підтримують CSS backdrop-filter?",
        answer: "Властивість backdrop-filter підтримується усіма сучасними браузерами (Chrome, Safari, Firefox, Edge)."
      },
      {
        question: "Чи можу я експортувати класи Tailwind CSS?",
        answer: "Так! Інструмент форматує параметри тіні у синтаксис Tailwind типу shadow-[0px_10px_25px_rgba(0,0,0,0.4)]."
      },
      {
        question: "Чим внутрішня тінь (inset) відрізняється від звичайної?",
        answer: "Внутрішня тінь відображається всередині контуру елемента, створюючи ефект втиснутої поверхні."
      }
    ]
  },
  about: {
    title: "Про VibeDev Tools",
    subtitle: "Створено розробниками для розробників — без серверів, з максимальною швидкістю.",
    missionTitle: "Наша місія",
    missionDesc: "VibeDev Tools створено для забезпечення веб-розробників та UI/UX дизайнерів набором швидких мікро-утиліт. Ми віримо, що інструменти розробника мають бути миттєвими, зручними та приватними.",
    privacyTitle: "100% Клієнтська Приватність",
    privacyDesc: "На відміну від сервісів, які відправляють ваші SVG або JSON на віддалені сервери, VibeDev Tools виконує всі обчислення виключно у браузері. Ваші дані ніколи не залишають ваш пристрій.",
    stackTitle: "Сучасний стек технологій",
    stackDesc: "Побудовано на React, Vite, TypeScript та Tailwind CSS з елегантним дизайном з підтримкою світлої/темної теми.",
  },
  contact: {
    title: "Зв'язатися з нами",
    subtitle: "Маєте пропозиції щодо нових інструментів або знайшли баг? Напишіть нам!",
    nameLabel: "Ваше ім'я",
    emailLabel: "Email адреса",
    subjectLabel: "Тема",
    messageLabel: "Ваше повідомлення",
    sendBtn: "Надіслати повідомлення",
    successToast: "Дякуємо! Ваше повідомлення успішно отримано.",
    contactInfoTitle: "Прямий зв'язок",
    emailDirect: "support@vibedev.tools",
    responseNotice: "Ми відповідаємо на запити розробників протягом 24–48 годин.",
  },
  privacy: {
    title: "Політика конфіденційності",
    subtitle: "Останнє оновлення: Жовтень 2026",
    section1Title: "1. Загальні положення та безпека даних",
    section1Text: "VibeDev Tools поважає приватність користувачів. Усі операції інструментів виконуються виключно у вашому браузері. Ми не збираємо, не передаємо та не зберігаємо ваш код чи графічні файли.",
    section2Title: "2. Реклама та Google AdSense",
    section2Text: "Для підтримки роботи сервісу ми відображаємо оголошення від Google AdSense. Google використовує файли cookie для показу релевантної реклами.",
    section3Title: "3. Cookie та Local Storage",
    section3Text: "Ми використовуємо LocalStorage виключно для збереження обраної мови інтерфейсу та теми оформлення.",
    section4Title: "4. Зовнішні посилання",
    section4Text: "Сайт може містити посилання на сторонні ресурси. Ми не несемо відповідальності за їх політику конфіденційності.",
    section5Title: "5. Контакти",
    section5Text: "З питань політики конфіденційності звертайтеся за адресою privacy@vibedev.tools.",
  }
};
