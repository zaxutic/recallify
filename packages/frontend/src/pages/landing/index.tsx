import { Icon } from "@ailibs/feather-react-ts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";

import Card from "components/Card";
import Input from "components/Input";

import Chart from "./Chart";
import SearchResults from "./SearchResults";
import { trpc } from "client";

const FadeGradient = styled.div({
  ...tw`absolute top-0 inset-x-0 h-60 -z-10 transition-opacity duration-300`,
  background:
    "linear-gradient(180deg, #7746DF 0%, #7746DF 0.4%, rgba(119, 70, 223, 0.99763) 1.62%, rgba(119, 70, 223, 0.992) 3.68%, rgba(119, 70, 223, 0.981037) 6.59%, rgba(119, 70, 223, 0.962963) 10.37%, rgba(119, 70, 223, 0.936) 15.04%, rgba(119, 70, 223, 0.89837) 20.62%, rgba(119, 70, 223, 0.848296) 27.12%, rgba(119, 70, 223, 0.784) 34.56%, rgba(119, 70, 223, 0.703704) 42.96%, rgba(119, 70, 223, 0.60563) 52.34%, rgba(119, 70, 223, 0.488) 62.72%, rgba(119, 70, 223, 0.349037) 74.11%, rgba(119, 70, 223, 0.186963) 86.53%, rgba(119, 70, 223, 0) 100%)",

  variants: {
    hidden: {
      true: tw`opacity-0`,
    },
  },
});

const Pill = styled.div({
  ...tw`
    px-4 py-1.5 rounded-full
    bg-gradient-to-tr from-[#764AD3]/60 to-[#5D33B6]/60
    text-white transition-[margin,transform] duration-300
  `,

  variants: {
    hidden: {
      true: tw`-mt-[3.75rem] -translate-y-4`,
    },
  },
});

const H2 = tw.h2`text-[15px] leading-tight mb-0`;
const Detail = styled.div(tw`text-[11px] leading-tight text-light-neutral-700 mb-3`);

const products = Array.from({ length: 26 }, (_, i) => String.fromCharCode("a".charCodeAt(0) + i));

const ProductsRow = ({ products }: { products: any }) => (
  <div tw="flex gap-3 p-1 pl-10 -mx-9 overflow-x-auto">
    {products.map((product, idx) => (
      <Link key={product.name} to={`/product/${idx}`}>
        <Card key={product.name} tw="flex items-center justify-center w-24 h-24 flex-shrink-0">
          <img tw="w-12 h-12" src={product.image_url} alt={product.name} />
        </Card>
      </Link>
    ))}
  </div>
);

const Alerts = styled.div({
  ...tw`
    flex items-center gap-2
    px-4 py-2 mt-4
    bg-red-100 text-red-1000 shadow-1 shadow-red-600/10
    text-[11px] rounded-md
  `,

  variants: {
    hidden: {
      true: tw`hidden`,
    },
  },
});

const Landing = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchedItem, setSearchedItem] = useState("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const [allRecalledProducts, setAllRecalledProducts] = useState<any>([]);

  const performGetRecalledProducts = async () => {
    const recalledProducts = await trpc.getRecalledProducts.query();

    if (recalledProducts) {
      setAllRecalledProducts(recalledProducts.products);
    }
  };

  const performSearchItem = async () => {
    const searchResult = await trpc.searchRecalledProducts.query({ searchTerm: searchedItem });

    if (searchResult) {
      console.log(searchResult.products)
      setAllRecalledProducts(searchResult.products);
    }
  };

  useEffect(() => {
    performGetRecalledProducts();
  }, []);

  return (
    <div tw="z-0 flex flex-col gap-4">
      <FadeGradient hidden={searchFocused} />

      <header tw="flex flex-col items-center gap-6">
        <Pill hidden={searchFocused}>Welcome back, Michelle</Pill>

        <div tw="relative mx-1 self-stretch text-light-neutral-1000">
          <Input
            tw="w-full px-10"
            placeholder="Search for a product..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => {
              if (searchedItem === "") setSearchFocused(false);
            }}
            onChange={e => {
              setSearchedItem(e.target.value);
              setTimeout(() => {
                if (searchedItem === "") setSearchFocused(false);
                else performSearchItem();
              }, 1000);
            }}
          />
          <span tw="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
            <Icon name="search" tw="[input:focus + div &]:text-purple-800" />
          </span>
          <button
            tw="absolute inset-y-0 right-0 px-3 inline-flex items-center"
            css={{ ...(!searchFocused && tw`hidden`) }}
            type="button"
            onClick={() => setSearchFocused(false)}
          >
            <Icon name="x" tw="p-1" />
          </button>
        </div>

        <Alerts hidden={searchFocused}>
          <Icon name="alert-triangle" tw="h-3.5 w-3.5" /> A product you recently purchased has been
          recalled.
        </Alerts>
      </header>

      <div tw="flex flex-col gap-4" css={{ ...(searchFocused && tw`hidden`) }}>
        <section>
          <H2>Watched Products</H2>
          <Detail>Last Updated: 9:41pm 4/03/23</Detail>
          {/* <ProductsRow products={products} /> */}
        </section>

        <section>
          <H2>Latest Recalled Products</H2>
          <Detail>Last Updated: 9:41pm 4/03/23</Detail>
          <ProductsRow products={allRecalledProducts} />
        </section>

        <section>
          <H2>Spending this Month</H2>
          <Detail>Last Updated: 9:41pm 4/03/23</Detail>
          <Card>
            <div tw="flex justify-between p-2">
              <span>
                $0.00 <Detail as="span">Today</Detail>
              </span>
              <span>
                $143.00 <Detail as="span">This month</Detail>
              </span>
            </div>
            <Chart />
          </Card>
        </section>
      </div>

      <SearchResults css={{ ...(!searchFocused && tw`hidden`) }} results={searchResult} />
    </div>
  );
};
export default Landing;
