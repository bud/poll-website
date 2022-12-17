import React from "react";

const TextInput = React.forwardRef((props, ref) => {
  const { name, required, value } = props;

  return (
    <>
      <div className="text-input-label">
        {name}
        {required ? <span className="text-rose-500">*</span> : null}
      </div>
      <input
        className="text-input-field"
        type="text"
        ref={ref}
        defaultValue={value || ""}
        placeholder={name}
      ></input>
    </>
  );
});

export default TextInput;
