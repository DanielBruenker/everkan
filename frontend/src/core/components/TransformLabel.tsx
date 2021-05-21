import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';

interface TransformLabelProps{
  value: string
  onChange: (event) => void;
}

const TransformLabel: React.FC<TransformLabelProps> = ({value, onChange}) => {

  const [toggle, setToggle] = useState<boolean>(true);

  return(
    toggle ? (
      <div
        onDoubleClick={() => {
          setToggle(false)
        }}
      ><h2>{value}</h2></div>
    ) : (
      <InputText
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === 'Escape') {
            setToggle(true)
            event.preventDefault()
            event.stopPropagation()
          }
        }}
      />
    )
  );
};

export default TransformLabel;