
  const getDate = () => {

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    };

    const today = new Date(); //DateConstructor

    return today.toLocaleDateString("en-US", options); //Format the day variable

  }

const getDay = () => {

  const options = {
    weekday: "long",
  };

  const today = new Date(); //DateConstructor

  return today.toLocaleDateString("en-US", options); //Format the day variable
}

module.exports = {
  getDate:getDate,
  getDay:getDay,
};