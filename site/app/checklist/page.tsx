import type { Metadata } from "next";
import Checklist from "@/components/Checklist";
import { getModules } from "@/lib/modules";

export const metadata: Metadata = {
  title: "Чеклист · CEO Agent Kit",
  description:
    "Інтерактивний чеклист розгортання приватного AI-агента: 14 модулів за порядком, прогрес зберігається у вашому браузері.",
};

export default function ChecklistPage() {
  const modules = getModules();
  return (
    <main>
      <div className="wrap narrow">
        <div className="page-head">
          <div className="kicker">Чеклист розгортання</div>
          <h1>14 модулів за порядком</h1>
          <p className="lead">
            Кожен наступний модуль спирається на попередні, тому не
            перестрибуйте. Прогрес зберігається у вашому браузері.
          </p>
        </div>
      </div>
      <Checklist modules={modules} />
    </main>
  );
}
