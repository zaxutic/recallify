import React, { useState } from "react";
import { Icon } from "@ailibs/feather-react-ts";
import tw from "twin.macro";
import Button from "components/Button";
import { styled } from "@stitches/react";


const StyledSelect = styled("select", {
  backgroundColor: '#FDFDFF !important',
  background: `url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat`,
  backgroundPosition: `calc(100% - 0.75rem) center !important`,
  MozAppearance: 'none !important',
  WebkitAppearance: 'none !important',
  appearance: 'none !important',
  paddingRight: '2rem !important',
})


const Settings = () => {
  const [trackedLocations, setTrackedLocations] = useState([
    "Campbelltown",
    "The University of Sydney",
  ]);
  const [trackedProducts, setTrackedProducts] = useState(["Emporer Puffs", "JBBQ"]);
  const [trackedCategories, setTrackedCategories] = useState([
    "Cheese",
    "Pet",
    "Fruits and Vegetables",
  ]);

  const updateTracker = (key: string, arrayToUpdate: string) => {
    // Removes the key from the array
    if (arrayToUpdate === "locations") {
      const tempArr = trackedLocations.filter((item) => item !== key);
      setTrackedLocations(tempArr);
    } else if (arrayToUpdate === "products") {
      const tempArr = trackedProducts.filter((item) => item !== key);
      setTrackedProducts(tempArr);
    } else if (arrayToUpdate === "categories") {
      const tempArr = trackedCategories.filter((item) => item !== key);
      setTrackedCategories(tempArr);
    }
  }

  return (
    <>
      <header>
        <h1>Settings</h1>
      </header>
      <form>
        <section tw="flex flex-col gap-2">
          <h2>General</h2>
          <div tw="flex flex-col gap-2">
            <label htmlFor="device-theme">Theme Preference</label>
            <StyledSelect id="device-theme" tw="flex justify-between py-[12px] px-[16px] border border-light-neutral-200 rounded-xl">
              <option value="Light Mode">Light Mode</option>
              <option value="Dark Mode">Dark Mode</option>
            </StyledSelect>
          </div>
          <div tw="flex flex-col gap-2">
            <div tw="flex flex-col gap-0">
              <label htmlFor="extra-features">Do you want to enable extra features?</label>
              <p tw="text-left text-sm text-[#59697D]">
                This will give access to visualisation elements such as a graph of your spending
                habits.
              </p>
            </div>
            <StyledSelect id="extra-features" tw="flex justify-between py-[12px] px-[16px] border border-light-neutral-200 rounded-xl">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </StyledSelect>
          </div>
        </section>
        <section>
          <h2>Notification</h2>
          <div tw="flex flex-col gap-2">
            <label htmlFor="notifications">Do you want to receive notifications?</label>
            <div>
              <input type="checkbox" value="Push Notifications" /> Push Notifications
            </div>
            <div>
              <input type="checkbox" value="Email" /> Email
            </div>
            <div>
              <input type="checkbox" value="I don't want to receive notifications" /> I don't want
              to receive notifications
            </div>
          </div>
        </section>
        <section tw="flex flex-col gap-2">
          <h2>Location</h2>
          <div tw="flex flex-col gap-2">
            <div tw="flex flex-col gap-0">
              <label htmlFor="rt-location-tracking">
                Do you want to enable real time location tracking?
              </label>
              <p tw="text-left text-sm text-[#59697D]">
                This is so that we are able to send you live updates about any recalled products in
                that location.
              </p>
            </div>
            <StyledSelect id="rt-location-tracking" tw="flex justify-between py-[12px] px-[16px] border border-light-neutral-200 rounded-xl">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </StyledSelect>
          </div>
          <div tw="flex flex-col gap-2">
            <div tw="flex flex-col gap-0">
              <label htmlFor="tracked-locations">Locations that are being observed</label>
              <p tw="text-left text-sm text-[#59697D]">
                These are locations that are being tracked. You will receive notifications if there
                is a recalled food in any of the following locations.
              </p>
            </div>
            <div tw="flex flex-col gap-2">
              {trackedLocations.map(location => (
                <div tw="flex justify-between py-[12px] px-[16px] bg-[#FDFDFF] border border-light-neutral-200 rounded-xl">
                  <p>{location}</p>
                  <Icon name="x-circle" onClick={() => updateTracker(location, "locations")}/>
                </div>
              ))}
            </div>
            <div tw="flex justify-end">
              <Button isSecondary>Add Location</Button>
            </div>
          </div>
        </section>
        <section tw="flex flex-col gap-2">
          <div tw="flex flex-col gap-2">
            <label htmlFor="rt-product-tracking">
              Do you want to enable real-time tracking of observed products?
            </label>
            <StyledSelect id="rt-product-tracking" tw="flex justify-between py-[12px] px-[16px] border border-light-neutral-200 rounded-xl">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </StyledSelect>
          </div>
          <div tw="flex flex-col gap-2">
            <div tw="flex flex-col gap-0">
              <label htmlFor="tracked-locations">Products that are being observed</label>
              <p tw="text-left text-sm text-[#59697D]">
                These are products that are being observed. You will receive notifications if any of
                the following products are recalled.
              </p>
            </div>
            <div tw="flex flex-col gap-2">
              {trackedProducts.map(product => (
                <div tw="flex justify-between py-[12px] px-[16px] bg-[#FDFDFF] border border-light-neutral-200 rounded-xl">
                  <p>{product}</p>
                  <Icon name="x-circle" onClick={() => updateTracker(product, "products")}/>
                </div>
              ))}
            </div>
            <div tw="flex justify-end">
              <Button isSecondary>Add Products</Button>
            </div>
          </div>
          <div tw="flex flex-col gap-2">
            <div tw="flex flex-col gap-0">
              <label htmlFor="tracked-locations">Categories that you follow</label>
              <p tw="text-left text-sm text-[#59697D]">
                You will receive notifications when a product in the following category gets
                recalled.
              </p>
            </div>
            <div tw="flex flex-col gap-2">
              {trackedCategories.map(category => (
                <div tw="flex justify-between py-[12px] px-[16px] bg-[#FDFDFF] border border-light-neutral-200 rounded-xl">
                  <p>{category}</p>
                  <Icon name="x-circle" onClick={() => updateTracker(category, "categories")} />
                </div>
              ))}
            </div>
            <div tw="flex justify-end">
              <Button isSecondary>Add Categories</Button>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default Settings;
