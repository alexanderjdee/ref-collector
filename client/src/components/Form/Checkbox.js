import React from "react";

export const Checkbox = props => (
  <div className="form-group">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" {...props}/>
      <label className="form-check-label">
        Private
      </label>
    </div>
  </div>
);