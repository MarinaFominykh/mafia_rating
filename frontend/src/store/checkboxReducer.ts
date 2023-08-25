import { CHECKBOX } from "../utils/constans";

interface CheckboxAction {
  type: typeof CHECKBOX;
  value: boolean;
}

interface CheckboxState {
  value: boolean;
}

const initialState: CheckboxState = {
  value: false
};

export const checkboxReducer = (state = initialState, action: CheckboxAction): CheckboxState => {
  switch (action.type) {
    case CHECKBOX:
      return {
        ...state,
        value: action.value 
      };
    default:
      return state;
  }
};
