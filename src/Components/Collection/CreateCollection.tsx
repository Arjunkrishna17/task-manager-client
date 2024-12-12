import React, { useState } from "react";

import Button from "../Buttons/Button";
import Popup from "../Popups/Popup";
import Input from "../Form/Input";

const CreateCollection = () => {
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  return (
    <>
      <Button
        name="+ collection"
        onClick={() => setShowCreatePopup(true)}
        type="primary"
        isLoading={false}
        customClassNames=" w-fit"
      />

      <Popup
        show={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        heading="Create Collection"
      >
        <div className="space-y-5">
          <Input
            label="Name"
            onChange={() => {}}
            value=""
            placeholder=""
            showError={false}
            type="text"
          />

          <div className="flex flex-col space-y-1">
            <label className="font-semibold text-xs" htmlFor="description">
              description
            </label>

            <textarea
              id="Description"
              value=""
              className="border h-28 resize-none rounded-md py-1 text-sm active:outline-blue-500 focus:outline-blue-500 px-2 placeholder:text-sm"
            />
          </div>

          <Button
            name="Create"
            onClick={() => {}}
            type="primary"
            isLoading={false}
            customClassNames=" w-full"
          />
        </div>
      </Popup>
    </>
  );
};

export default CreateCollection;
