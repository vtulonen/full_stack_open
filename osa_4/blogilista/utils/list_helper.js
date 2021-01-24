const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue
  } 
 
  const likesArray = blogs.map((item) => {
    return item.likes
  })

  return likesArray.reduce(reducer, 0);
}

module.exports = {
  dummy,
  totalLikes,
}
