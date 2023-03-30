"use strict";
(() => {
var exports = {};
exports.id = 170;
exports.ids = [170];
exports.modules = {

/***/ 4379:
/***/ ((module) => {

module.exports = require("@pinecone-database/pinecone");

/***/ }),

/***/ 7886:
/***/ ((module) => {

module.exports = import("langchain/callbacks");;

/***/ }),

/***/ 360:
/***/ ((module) => {

module.exports = import("langchain/chains");;

/***/ }),

/***/ 2820:
/***/ ((module) => {

module.exports = import("langchain/embeddings");;

/***/ }),

/***/ 3886:
/***/ ((module) => {

module.exports = import("langchain/llms");;

/***/ }),

/***/ 5459:
/***/ ((module) => {

module.exports = import("langchain/prompts");;

/***/ }),

/***/ 2025:
/***/ ((module) => {

module.exports = import("langchain/vectorstores");;

/***/ }),

/***/ 6168:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ PINECONE_NAME_SPACE),
/* harmony export */   "_": () => (/* binding */ PINECONE_INDEX_NAME)
/* harmony export */ });
/**
 * Change the index and namespace to your own
 */ const PINECONE_INDEX_NAME = "livingodischargesummarylangchain";
const PINECONE_NAME_SPACE = "discharge-summaries"; //namespace is optional for your vectors



/***/ }),

/***/ 8213:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2820);
/* harmony import */ var langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2025);
/* harmony import */ var _utils_makechain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2616);
/* harmony import */ var _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9018);
/* harmony import */ var _config_pinecone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6168);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__, _utils_makechain__WEBPACK_IMPORTED_MODULE_2__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_3__]);
([langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__, _utils_makechain__WEBPACK_IMPORTED_MODULE_2__, _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





async function handler(req, res) {
    const { question , history  } = req.body;
    if (!question) {
        return res.status(400).json({
            message: "No question in the request"
        });
    }
    // OpenAI recommends replacing newlines with spaces for best results
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const index = _utils_pinecone_client__WEBPACK_IMPORTED_MODULE_3__/* .pinecone.Index */ .O.Index(_config_pinecone__WEBPACK_IMPORTED_MODULE_4__/* .PINECONE_INDEX_NAME */ ._);
    /* create vectorstore*/ const vectorStore = await langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__.PineconeStore.fromExistingIndex(index, new langchain_embeddings__WEBPACK_IMPORTED_MODULE_0__.OpenAIEmbeddings({}), "text", _config_pinecone__WEBPACK_IMPORTED_MODULE_4__/* .PINECONE_NAME_SPACE */ .E);
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive"
    });
    const sendData = (data)=>{
        res.write(`data: ${data}\n\n`);
    };
    sendData(JSON.stringify({
        data: ""
    }));
    //create chain
    const chain = (0,_utils_makechain__WEBPACK_IMPORTED_MODULE_2__/* .makeChain */ .F)(vectorStore, (token)=>{
        sendData(JSON.stringify({
            data: token
        }));
    });
    try {
        //Ask a question
        const response = await chain.call({
            question: sanitizedQuestion,
            chat_history: history || []
        });
        console.log("response", response);
        sendData(JSON.stringify({
            sourceDocs: response.sourceDocuments
        }));
    } catch (error) {
        console.log("error", error);
    } finally{
        sendData("[DONE]");
        res.end();
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2616:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ makeChain)
/* harmony export */ });
/* harmony import */ var langchain_llms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3886);
/* harmony import */ var langchain_chains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(360);
/* harmony import */ var langchain_prompts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5459);
/* harmony import */ var langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7886);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_llms__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_prompts__WEBPACK_IMPORTED_MODULE_2__, langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__]);
([langchain_llms__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_prompts__WEBPACK_IMPORTED_MODULE_2__, langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const CONDENSE_PROMPT = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`);
const QA_PROMPT = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__.PromptTemplate.fromTemplate(`You are an AI assistant of a doctor, assisting them by providing relevant information of his patients. You are given the following extracted parts of a long document and a question. Provide a conversational answer based on the context provided.
You should only provide hyperlinks that reference the context below. Do NOT make up hyperlinks.
If you can't find the answer in the context below, just say "Hmm, I'm not sure." Don't try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

Question: {question}
=========
{context}
=========
Answer in Markdown:`);
const makeChain = (vectorstore, onTokenStream)=>{
    const questionGenerator = new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.LLMChain({
        llm: new langchain_llms__WEBPACK_IMPORTED_MODULE_0__.OpenAIChat({
            temperature: 0
        }),
        prompt: CONDENSE_PROMPT
    });
    const docChain = (0,langchain_chains__WEBPACK_IMPORTED_MODULE_1__.loadQAChain)(new langchain_llms__WEBPACK_IMPORTED_MODULE_0__.OpenAIChat({
        temperature: 0,
        modelName: "gpt-3.5-turbo",
        streaming: Boolean(onTokenStream),
        callbackManager: onTokenStream ? langchain_callbacks__WEBPACK_IMPORTED_MODULE_3__.CallbackManager.fromHandlers({
            async handleLLMNewToken (token) {
                onTokenStream(token);
                console.log(token);
            }
        }) : undefined
    }), {
        prompt: QA_PROMPT
    });
    return new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.ChatVectorDBQAChain({
        vectorstore,
        combineDocumentsChain: docChain,
        questionGeneratorChain: questionGenerator,
        returnSourceDocuments: true,
        k: 1
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9018:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ pinecone)
/* harmony export */ });
/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4379);
/* harmony import */ var _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__);

console.log(process.env.PINECONE_ENVIRONMENT);
if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
    throw new Error("Pinecone environment or api key vars missing");
}
async function initPinecone() {
    try {
        const pinecone = new _pinecone_database_pinecone__WEBPACK_IMPORTED_MODULE_0__.PineconeClient();
        await pinecone.init({
            environment: process.env.PINECONE_ENVIRONMENT ?? "",
            apiKey: process.env.PINECONE_API_KEY ?? ""
        });
        return pinecone;
    } catch (error) {
        console.log("error", error);
        throw new Error("Failed to initialize Pinecone Client");
    }
}
const pinecone = await initPinecone();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8213));
module.exports = __webpack_exports__;

})();