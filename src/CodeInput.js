import React from 'react';

const CodeInput = ({ code=[1,2,3,4], onChange, colors })=> (
  code.map((dot, i) => (
    <div className={'dot-'+dot} key={i}>
      <button className={'up'+i} onClick={()=> onChange(
          code.map((digit, index)=> index !== i ? digit : (digit + 1) % colors)
        )}>
        up
      </button>
      <button className={'dn'+i} onClick={()=> onChange(
          code.map((digit, index)=> index !== i ? digit : (digit - 1 + colors) % colors )
        )}>
        dn
      </button>
    </div>
  ))
);

export default CodeInput;
