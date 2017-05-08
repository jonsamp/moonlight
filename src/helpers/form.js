export const collectFormValues = (e) => {
  const formData = Object.values(e.target.elements).reduce((capture, formElement) => {
    if (formElement.type === 'checkbox' || formElement.type === 'radio') {
      return {
        ...capture,
        [formElement.id]: formElement.checked
      }
    } else {
      return {
        ...capture,
        [formElement.id]: formElement.value
      }
    }
  }, {})

  return formData;
}

export const mergeUserInfo = (state, e) => {
  const userInfo = {
    ...state.info,
    [e.target.id]: e.target.value
  };

  const user = {
    ...state,
    info: userInfo
  };

  return user;
}
