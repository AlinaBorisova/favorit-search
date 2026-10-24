import { SearchForm, BrandList } from "@/features/parts-search";
import { OffersSection } from "@/features/parts-search";

function App() {
  return (
    <div className="container py-4">
      <h1 className="h3">Поиск автозапчастей</h1>
      <SearchForm />
      <div className="mt-4">
        <BrandList />
      </div>
      <div className="mt-4">
        <OffersSection />
      </div>
    </div>
  );
}

export default App;
