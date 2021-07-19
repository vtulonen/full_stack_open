export const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data.toLowerCase()

    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'FILTER',
    data: filter,
  }
}
