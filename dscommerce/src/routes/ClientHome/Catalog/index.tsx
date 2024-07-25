import { useEffect, useState } from "react";
import ButtonNextPage from "../../../components/ButtonNextPage";
import * as productService from "../../../services/product-service.ts";
import CatalogCard from "../../../components/CatalogCard";
import SearchBar from "../../../components/SearchBar";
import "./styles.css";
import { ProductDTO } from "../../../models/product.ts";

export default function Catalog() {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [productName, setProducName] = useState("");

  useEffect(() => {
    //localStorage.setItem("minhaCategoria", JSON.stringify(objTest));

    const obj = JSON.parse(localStorage.getItem("minhaCat") || "{}");
    console.log(obj);

    productService.findPageRequest(0, productName).then((response) => {
      setProducts(response.data.content);
    });
  }, [productName]);

  function handleSearch(searchText: string) {
    setProducName(searchText);
  }

  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <SearchBar onSearch={handleSearch} />
        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
          {products.map((product) => (
            <CatalogCard key={product.id} product={product} />
          ))}
        </div>
        <ButtonNextPage />
      </section>
    </main>
  );
}
