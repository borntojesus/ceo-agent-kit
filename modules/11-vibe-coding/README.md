# 11. Vercel + Supabase: вайбкодинг

Тепер агент будує для вас продукти. Ви описуєте ідею в Telegram у топіку Проєкти, агент створює застосунок, базу даних до нього, викладає в інтернет і чіпляє на субдомен вашого домену. Від ідеї до посилання, яким можна поділитись, за один вечір.

## Що ви отримаєте

- Конвеєр для міні-проєктів: лендінгів, внутрішніх інструментів, калькуляторів, MVP.
- Кожен проєкт: код у вашому GitHub, база в Supabase, хостинг на Vercel, адреса виду `назва.вашдомен.com`.
- Безкоштовні плани Vercel і Supabase покривають кілька проєктів без оплат.

## Що зробити руками

1. Створіть акаунт [Vercel](https://vercel.com/signup): Sign up → Continue with GitHub (план Hobby).
2. Створіть акаунт [Supabase](https://supabase.com/dashboard/sign-up): теж через GitHub (план Free).
3. Створіть токени для агента:
   - Vercel: Settings → Tokens → Create ([vercel.com/account/tokens](https://vercel.com/account/tokens)).
   - Supabase: Account → Access Tokens → Generate new token ([supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens)).
   - GitHub: [github.com/settings/personal-access-tokens](https://github.com/settings/personal-access-tokens) → Fine-grained → All repositories (або окремо на майбутні репо), права Contents і Administration: Read and write. Цим токеном агент створюватиме репо проєктів.

## Що зробить агент

На сервері запустіть `claude` і вставте цілком файл
[prompts/vibe-project.md](prompts/vibe-project.md). Перший запуск: агент збереже три токени в 1Password і перевірить доступи. Далі цей промпт запускається на кожен новий проєкт, або просто пишіть у топік Проєкти: "зроби мені X".

## Перевірка

Попросіть агента зробити тестовий проєкт: "зроби сторінку-візитку з моїм ім'ям на субдомені hello". За 10-15 хвилин отримаєте посилання `hello.вашдомен.com`, що відкривається.

## Куди зберегти доступи

- "Vercel token (agent)", "Supabase token (agent)", "GitHub token (projects)": створить агент через op.
