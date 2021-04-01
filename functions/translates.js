const { Translate } = require("@google-cloud/translate").v2;

const credentials = {
  // your credentials
};

const translate = new Translate({
  credentials: credentials,
  projectId: credentials.project_id,
});

const detectLanguage = async (text) => {
  try {
    let response = await translate.detect(text);
    return response[0].language;
  } catch (error) {
    console.log(`Error at detectLanguage --> ${error}`);
    return 0;
  }
};

const translateText = async (text, targetLanguage) => {
  try {
    let response = await translate.translate(text, targetLanguage);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return 0;
  }
};

exports.translateText = translateText;
exports.detectLanguage = detectLanguage;
