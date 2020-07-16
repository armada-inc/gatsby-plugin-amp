"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.replaceRenderer = exports.onRenderBody = exports.onPreRenderHTML = void 0;

var _react = _interopRequireWildcard(require("react"));

var _server = require("react-dom/server");

var _minimatch = require("minimatch");

var _lodash = _interopRequireDefault(require("lodash.flattendeep"));

var _path2 = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _jsxFileName = "C:\\Users\\Shyam Lohar\\Documents\\open-source\\gatsby-plugin-amp\\src\\gatsby-ssr.js";
const JSDOM = eval('require("jsdom")').JSDOM;

const minimatch = require("minimatch");

const ampBoilerplate = `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`;
const ampNoscriptBoilerplate = `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`;

const interpolate = (str, map) => str.replace(/{{\s*[\w\.]+\s*}}/g, match => map[match.replace(/[{}]/g, "")]);

const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
  getPreBodyComponents,
  replacePreBodyComponents,
  getPostBodyComponents,
  replacePostBodyComponents,
  pathname
}, {
  analytics,
  canonicalBaseUrl,
  components = [],
  includedPaths = [],
  excludedPaths = [],
  dirName,
  themePath,
  pathIdentifier = "/amp/",
  relAmpHtmlPattern = "{{canonicalBaseUrl}}{{pathname}}{{pathIdentifier}}"
}) => {
  const headComponents = (0, _lodash.default)(getHeadComponents());
  const preBodyComponents = getPreBodyComponents();
  const postBodyComponents = getPostBodyComponents();
  const isAmp = pathname && pathname.indexOf(pathIdentifier) > -1;

  if (isAmp) {
    const file = _fs.default.readFileSync(_path2.default.resolve(dirName, themePath));

    const styles = file.toString();
    replaceHeadComponents([_react.default.createElement("script", {
      async: true,
      src: "https://cdn.ampproject.org/v0.js",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      },
      __self: void 0
    }), _react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: ampBoilerplate
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      },
      __self: void 0
    }), _react.default.createElement("noscript", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: void 0
    }, _react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: ampNoscriptBoilerplate
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: void 0
    })), _react.default.createElement("style", {
      "amp-custom": "",
      dangerouslySetInnerHTML: {
        __html: styles
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: void 0
    }), ...components.map((component, i) => _react.default.createElement("script", {
      key: `custom-element-${i}`,
      async: true,
      "custom-element": `${typeof component === "string" ? component : component.name}`,
      src: `https://cdn.ampproject.org/v0/${typeof component === "string" ? component : component.name}-${typeof component === "string" ? "0.1" : component.version}.js`,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: void 0
    })), analytics !== undefined ? _react.default.createElement("script", {
      async: true,
      "custom-element": "amp-analytics",
      src: "https://cdn.ampproject.org/v0/amp-analytics-0.1.js",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73
      },
      __self: void 0
    }) : _react.default.createElement(_react.Fragment, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79
      },
      __self: void 0
    }), ...headComponents.filter(x => x.type !== "style" && (x.type !== "script" || x.props.type === "application/ld+json") && x.key !== "TypographyStyle")]);
    replacePreBodyComponents([...preBodyComponents.filter(x => x.key !== "plugin-google-tagmanager")]);
    replacePostBodyComponents(postBodyComponents.filter(x => x.type !== "script"));
  } else if (excludedPaths.length > 0 && pathname && excludedPaths.findIndex(_path => new _minimatch.Minimatch(pathname).match(_path)) < 0 || includedPaths.length > 0 && pathname && includedPaths.findIndex(_path => minimatch(pathname, _path)) > -1 || excludedPaths.length === 0 && includedPaths.length === 0) {
    replaceHeadComponents([_react.default.createElement("link", {
      rel: "amphtml",
      key: "gatsby-plugin-amp-amphtml-link",
      href: interpolate(relAmpHtmlPattern, {
        canonicalBaseUrl,
        pathIdentifier,
        pathname
      }).replace(/([^:])(\/\/+)/g, "$1/"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105
      },
      __self: void 0
    }), ...headComponents]);
  }
};

exports.onPreRenderHTML = onPreRenderHTML;

const onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setPreBodyComponents,
  pathname
}, {
  analytics,
  canonicalBaseUrl,
  pathIdentifier = "/amp/",
  relCanonicalPattern = "{{canonicalBaseUrl}}{{pathname}}",
  useAmpClientIdApi = false
}) => {
  const isAmp = pathname && pathname.indexOf(pathIdentifier) > -1;

  if (isAmp) {
    setHtmlAttributes({
      amp: ""
    });
    setHeadComponents([_react.default.createElement("link", {
      rel: "canonical",
      href: interpolate(relCanonicalPattern, {
        canonicalBaseUrl,
        pathname
      }).replace(pathIdentifier, "").replace(/([^:])(\/\/+)/g, "$1/"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 133
      },
      __self: void 0
    }), useAmpClientIdApi ? _react.default.createElement("meta", {
      name: "amp-google-client-id-api",
      content: "googleanalytics",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 143
      },
      __self: void 0
    }) : _react.default.createElement(_react.Fragment, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 145
      },
      __self: void 0
    })]);
    setPreBodyComponents([analytics != undefined ? _react.default.createElement("amp-analytics", {
      type: analytics.type,
      "data-credentials": analytics.dataCredentials,
      config: typeof analytics.config === "string" ? analytics.config : undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 150
      },
      __self: void 0
    }, typeof analytics.config === "string" ? _react.default.createElement(_react.Fragment, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158
      },
      __self: void 0
    }) : _react.default.createElement("script", {
      type: "application/json",
      dangerouslySetInnerHTML: {
        __html: interpolate(JSON.stringify(analytics.config), {
          pathname
        })
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 160
      },
      __self: void 0
    })) : _react.default.createElement(_react.Fragment, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 171
      },
      __self: void 0
    })]);
  }
};

exports.onRenderBody = onRenderBody;

const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
  pathname
}, {
  pathIdentifier = "/amp/"
}) => {
  const defaults = {
    image: {
      width: 640,
      height: 475,
      layout: "responsive"
    },
    twitter: {
      width: "390",
      height: "330",
      layout: "responsive"
    },
    iframe: {
      width: 640,
      height: 475,
      layout: "responsive"
    }
  };
  const headComponents = [];
  const isAmp = pathname && pathname.indexOf(pathIdentifier) > -1;

  if (isAmp) {
    const bodyHTML = (0, _server.renderToString)(bodyComponent);
    const dom = new JSDOM(bodyHTML);
    const document = dom.window.document; // convert images to amp-img or amp-anim

    const images = [].slice.call(document.getElementsByTagName("img"));
    images.forEach(image => {
      let ampImage;

      if (image.src && image.src.indexOf(".gif") > -1) {
        ampImage = document.createElement("amp-anim");
        headComponents.push({
          name: "amp-anim",
          version: "0.1"
        });
      } else {
        ampImage = document.createElement("amp-img");
      }

      const attributes = Object.keys(image.attributes);
      const includedAttributes = attributes.map(key => {
        const attribute = image.attributes[key];
        ampImage.setAttribute(attribute.name, attribute.value);
        return attribute.name;
      });
      Object.keys(defaults.image).forEach(key => {
        if (includedAttributes && includedAttributes.indexOf(key) === -1) {
          ampImage.setAttribute(key, defaults.image[key]);
        }
      });
      image.parentNode.replaceChild(ampImage, image);
    }); // convert twitter posts to amp-twitter

    const twitterPosts = [].slice.call(document.getElementsByClassName("twitter-tweet"));
    twitterPosts.forEach(post => {
      headComponents.push({
        name: "amp-twitter",
        version: "0.1"
      });
      const ampTwitter = document.createElement("amp-twitter");
      const attributes = Object.keys(post.attributes);
      const includedAttributes = attributes.map(key => {
        const attribute = post.attributes[key];
        ampTwitter.setAttribute(attribute.name, attribute.value);
        return attribute.name;
      });
      Object.keys(defaults.twitter).forEach(key => {
        if (includedAttributes && includedAttributes.indexOf(key) === -1) {
          ampTwitter.setAttribute(key, defaults.twitter[key]);
        }
      }); // grab the last link in the tweet for the twee id

      const links = [].slice.call(post.getElementsByTagName("a"));
      const link = links[links.length - 1];
      const hrefArr = link.href.split("/");
      const id = hrefArr[hrefArr.length - 1].split("?")[0];
      ampTwitter.setAttribute("data-tweetid", id); // clone the original blockquote for a placeholder

      const _post = post.cloneNode(true);

      _post.setAttribute("placeholder", "");

      ampTwitter.appendChild(_post);
      post.parentNode.replaceChild(ampTwitter, post);
    }); // convert iframes to amp-iframe or amp-youtube

    const iframes = [].slice.call(document.getElementsByTagName("iframe"));
    iframes.forEach(iframe => {
      let ampIframe;
      let attributes;

      if (iframe.src && iframe.src.indexOf("youtube.com/embed/") > -1) {
        headComponents.push({
          name: "amp-youtube",
          version: "0.1"
        });
        ampIframe = document.createElement("amp-youtube");
        const src = iframe.src.split("/");
        const id = src[src.length - 1].split("?")[0];
        ampIframe.setAttribute("data-videoid", id);
        const placeholder = document.createElement("amp-img");
        placeholder.setAttribute("src", `https://i.ytimg.com/vi/${id}/mqdefault.jpg`);
        placeholder.setAttribute("placeholder", "");
        placeholder.setAttribute("layout", "fill");
        ampIframe.appendChild(placeholder);
        const forbidden = ["allow", "allowfullscreen", "frameborder", "src"];
        attributes = Object.keys(iframe.attributes).filter(key => {
          const attribute = iframe.attributes[key];
          return !forbidden.includes(attribute.name);
        });
      } else {
        headComponents.push({
          name: "amp-iframe",
          version: "0.1"
        });
        ampIframe = document.createElement("amp-iframe");
        attributes = Object.keys(iframe.attributes);
      }

      const includedAttributes = attributes.map(key => {
        const attribute = iframe.attributes[key];
        ampIframe.setAttribute(attribute.name, attribute.value);
        return attribute.name;
      });
      Object.keys(defaults.iframe).forEach(key => {
        if (includedAttributes && includedAttributes.indexOf(key) === -1) {
          ampIframe.setAttribute(key, defaults.iframe[key]);
        }
      });
      iframe.parentNode.replaceChild(ampIframe, iframe);
    }); // convert amp-instagram

    const igEmbeds = [].slice.call(document.getElementsByClassName("instagram-media"));
    igEmbeds.forEach(igEmbed => {
      let ampIgEmbed;
      let shortCode;
      let igPermalink;
      igPermalink = igEmbed.attributes["data-instgrm-permalink"].value;
      shortCode = igPermalink.match(/\/p\/(.+)\//)[1];
      headComponents.push({
        name: "amp-instagram",
        version: "0.1"
      });
      ampIgEmbed = document.createElement("amp-instagram");
      ampIgEmbed.setAttribute("data-shortcode", shortCode);
      ampIgEmbed.setAttribute("layout", "responsive");
      ampIgEmbed.setAttribute("width", 1); // The value doesn't matter, but it's required

      ampIgEmbed.setAttribute("height", 1); // The value doesn't matter, but it's required

      ampIgEmbed.setAttributeNode(document.createAttribute("data-captioned"));
      igEmbed.parentNode.replaceChild(ampIgEmbed, igEmbed);
    });
    document.querySelectorAll('script[src="//www.instagram.com/embed.js"]').forEach(script => {
      script.remove();
    }); // convert amp-facebook

    const fbPosts = [].slice.call(document.getElementsByClassName("fb-post"));
    fbPosts.forEach(fbPost => {
      let ampFbPost;
      headComponents.push({
        name: "amp-facebook",
        version: "0.1"
      });
      ampFbPost = document.createElement("amp-facebook");
      ampFbPost.setAttribute("data-href", fbPost.attributes["data-href"].value);
      ampFbPost.setAttribute("width", 1); // The value doesn't matter, but it's required

      ampFbPost.setAttribute("height", 1); // The value doesn't matter, but it's required

      ampFbPost.setAttribute("layout", "responsive");
      fbPost.parentNode.replaceChild(ampFbPost, fbPost);
    });
    document.querySelectorAll('script[src^="https://connect.facebook.net/en_US/sdk.js"]').forEach(script => {
      script.remove();
    });
    setHeadComponents(Array.from(new Set(headComponents)).map((component, i) => _react.default.createElement(_react.Fragment, {
      key: `head-components-${i}`,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 358
      },
      __self: void 0
    }, _react.default.createElement("script", {
      async: true,
      "custom-element": component.name,
      src: `https://cdn.ampproject.org/v0/${component.name}-${component.version}.js`,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 359
      },
      __self: void 0
    }))));
    replaceBodyHTMLString(document.body.children[0].outerHTML);
  }
};

exports.replaceRenderer = replaceRenderer;