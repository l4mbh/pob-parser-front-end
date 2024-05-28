const convertToHtml = (inputString) => {
  // Replace \n with <br>
  let htmlString = inputString.replace(/\n/g, '<br>');

  // Replace ^x<Mã màu>...^7 with styled span tags
  const pattern = /\^x([0-9A-Fa-f]{6})(.*?)\^7/g;

  htmlString = htmlString.replace(pattern, (match, colorCode, text) => {
      const style = `color:#${colorCode};`;
      return `<span style="${style}">${text}</span>`;
  });

  return htmlString;
}


export default convertToHtml;