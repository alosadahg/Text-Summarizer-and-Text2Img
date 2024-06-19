const axios = require('axios');
async function generateImage(prompt) {
  let data = JSON.stringify({
    "inputs": prompt
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/alvdansen/littletinies',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    responseType: 'arraybuffer',
    data : data
  };
  
  try {
    const response = await axios.request(config);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
  
}
module.exports = generateImage;
