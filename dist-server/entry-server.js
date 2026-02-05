var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import React3, { Component, useState, useEffect, useRef } from "react";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useTranslation, initReactI18next } from "react-i18next";
import { Globe, Terminal, Activity, ArrowRight, Target, Zap, Eye, Database, Cpu, Workflow } from "lucide-react";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React3.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React3.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React3.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React3.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React3.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React3.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
var Page = /* @__PURE__ */ ((Page2) => {
  Page2["HOME"] = "HOME";
  Page2["OPS"] = "OPS";
  Page2["LOGS"] = "LOGS";
  Page2["LAB"] = "LAB";
  Page2["INITIATE"] = "INITIATE";
  return Page2;
})(Page || {});
const GridBackground = () => {
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-20 opacity-[0.05] pointer-events-none mix-blend-overlay",
        style: {
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px"
        }
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { y: 0 },
        animate: { y: 50 },
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        },
        className: "absolute inset-0 z-0 opacity-20",
        style: {
          backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px),
                            linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] z-10" })
  ] });
};
const SniperCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const springConfig = { damping: 30, stiffness: 700, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target;
      const isClickable = target.closest("button") || target.closest("a") || target.closest("input") || target.closest('[data-hover="true"]');
      setIsHovering(!!isClickable);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center will-change-transform mix-blend-difference",
      style: {
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%"
      },
      children: /* @__PURE__ */ jsxs(
        motion.svg,
        {
          width: "40",
          height: "40",
          viewBox: "0 0 40 40",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          animate: {
            rotate: isHovering ? 90 : 0,
            scale: isHovering ? 0.8 : 1
          },
          transition: { duration: 0.15, ease: "easeOut" },
          children: [
            /* @__PURE__ */ jsx(
              motion.line,
              {
                x1: "12",
                y1: "20",
                x2: "28",
                y2: "20",
                stroke: isHovering ? "#FF5F00" : "white",
                strokeWidth: isHovering ? "2" : "1",
                strokeOpacity: isHovering ? 1 : 0.8
              }
            ),
            /* @__PURE__ */ jsx(
              motion.line,
              {
                x1: "20",
                y1: "12",
                x2: "20",
                y2: "28",
                stroke: isHovering ? "#FF5F00" : "white",
                strokeWidth: isHovering ? "2" : "1",
                strokeOpacity: isHovering ? 1 : 0.8
              }
            ),
            /* @__PURE__ */ jsx(
              motion.circle,
              {
                cx: "20",
                cy: "20",
                r: "16",
                stroke: "#FF5F00",
                strokeWidth: "1",
                initial: { scale: 0, opacity: 0 },
                animate: { scale: isHovering ? 1 : 0, opacity: isHovering ? 1 : 0 },
                transition: { duration: 0.2 }
              }
            )
          ]
        }
      )
    }
  );
};
const LanguageSwitcher = () => {
  const { i18n: i18n2 } = useTranslation();
  const currentLang = (i18n2.language || "en").split("-")[0];
  const handleToggle = () => {
    const newLang = currentLang === "en" ? "es" : "en";
    i18n2.changeLanguage(newLang);
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: handleToggle,
      className: "flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-[#FF5F00] transition-all uppercase font-mono text-xs tracking-wider group bg-white/5 backdrop-blur-sm",
      children: [
        /* @__PURE__ */ jsx(Globe, { size: 14, className: "group-hover:text-[#FF5F00] transition-colors" }),
        /* @__PURE__ */ jsx("span", { children: currentLang === "es" ? "ES" : "EN" })
      ]
    }
  );
};
const Header = ({ activePage, setPage }) => {
  const { t } = useTranslation();
  const navItems = [
    { id: Page.OPS, label: t("nav.ops"), path: "/ops" },
    { id: Page.LOGS, label: t("nav.logs"), path: "/logs" },
    { id: Page.LAB, label: t("nav.lab"), path: "/lab" }
  ];
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: "fixed top-0 left-0 w-full z-50 bg-[#050505]/60 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-6 md:px-12 transition-all duration-300",
      style: {
        WebkitBackdropFilter: "blur(12px)"
        // Ensure Glassmorphism works on Safari
      },
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setPage(Page.HOME),
            className: "flex items-center gap-2 group",
            "data-hover": "true",
            children: /* @__PURE__ */ jsx("span", { className: "font-['Space_Grotesk'] font-bold text-2xl tracking-tighter text-white group-hover:text-[#FF5F00] transition-colors", children: "ZEROED" })
          }
        ),
        /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-8", children: navItems.map((item) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setPage(item.id),
            className: `text-sm font-['Inter'] font-medium tracking-widest transition-colors ${activePage === item.id ? "text-[#FF5F00]" : "text-zinc-400 hover:text-white"}`,
            "data-hover": "true",
            children: item.label
          },
          item.id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsx(LanguageSwitcher, {}),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setPage(Page.INITIATE),
              className: "bg-[#FF5F00] hover:bg-white text-black font-['Space_Grotesk'] font-bold text-sm px-6 py-2 uppercase tracking-wide transition-all hover:scale-105",
              "data-hover": "true",
              children: t("nav.initiate")
            }
          )
        ] })
      ]
    }
  );
};
const HomeSpotlightCard = ({ children, className = "", onClick }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    setOpacity(0);
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref: divRef,
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setOpacity(1),
      onMouseLeave: handleMouseLeave,
      onClick,
      style: {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1e3
      },
      className: `relative overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-[#FF5F00]/50 transition-colors duration-500 cursor-pointer group ${className}`,
      "data-hover": "true",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute -inset-px opacity-0 transition duration-300",
            style: {
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 95, 0, 0.1), transparent 40%)`
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 h-full p-8", style: { transform: "translateZ(30px)" }, children })
      ]
    }
  );
};
const ZDivider = () => /* @__PURE__ */ jsxs("div", { className: "w-full flex items-center justify-center py-24 opacity-50", children: [
  /* @__PURE__ */ jsx("div", { className: "h-[1px] w-24 bg-gradient-to-r from-transparent to-zinc-700" }),
  /* @__PURE__ */ jsxs("div", { className: "mx-6 font-['Space_Grotesk'] font-bold text-2xl text-white", children: [
    "Z",
    /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00]", children: "." })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "h-[1px] w-24 bg-gradient-to-l from-transparent to-zinc-700" })
] });
const Home = ({ setPage }) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "w-full min-h-screen pt-20 pb-12 flex flex-col relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        className: "container mx-auto px-6 md:px-12 mb-32 z-10 mt-12 md:mt-24 flex flex-col items-center text-center relative",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-[-150px] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-white opacity-[0.03] blur-[120px] rounded-full pointer-events-none -z-10" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen flex items-center justify-center pointer-events-none select-none -z-10 overflow-hidden", children: /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-[25vw] font-black font-['Space_Grotesk'] leading-none tracking-tighter text-center whitespace-nowrap",
              style: {
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)",
                color: "transparent"
              },
              children: "ZEROED"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 border border-white/10 rounded-full px-4 py-1.5 mb-8 bg-white/5 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-[#FF5F00] animate-pulse" }),
            /* @__PURE__ */ jsx("p", { className: "text-zinc-400 font-['Inter'] text-xs tracking-widest uppercase font-medium", children: t("protocol_online") })
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-7xl md:text-9xl font-['Space_Grotesk'] font-black tracking-tighter leading-[0.9] mb-8 select-none relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "text-white whitespace-pre-line", children: t("precision_over_noise").split("\n")[0] }),
            /* @__PURE__ */ jsxs("div", { className: "relative inline-block group cursor-default bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent", children: [
              t("precision_over_noise").split("\n")[1],
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 bottom-2 w-full h-[5px] bg-[#FF5F00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-zinc-400 max-w-2xl text-lg font-['Inter'] mb-12 leading-relaxed font-light relative z-10", children: t("data_driven_growth") }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setPage(Page.INITIATE),
              className: "relative z-10 bg-[#FF5F00] hover:bg-white text-black text-lg px-10 py-4 font-bold font-['Space_Grotesk'] uppercase tracking-wide transition-all duration-300 hover:scale-105",
              "data-hover": "true",
              children: t("get_zeroed")
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        className: "w-full py-24 relative z-10",
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl border border-[#FF5F00]/30 bg-[#050505] shadow-[0_0_50px_rgba(255,95,0,0.1)]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-2 border-b border-[#FF5F00]/20 bg-[#FF5F00]/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Terminal, { size: 14, className: "text-[#FF5F00]" }),
                /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-[#FF5F00] uppercase tracking-widest", children: "System_Alert.log" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-[#FF5F00]/50" }),
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-[#FF5F00]/20" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-8 font-mono text-sm md:text-base space-y-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[#FF5F00] font-bold mb-4", children: t("critical_error") }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-zinc-400", children: [
                /* @__PURE__ */ jsxs("p", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-zinc-600", children: "001" }),
                  /* @__PURE__ */ jsx("span", { children: "Parsing content engine performance..." })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-zinc-600", children: "002" }),
                  /* @__PURE__ */ jsx("span", { children: t("analysis_content") })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-zinc-600", children: "003" }),
                  /* @__PURE__ */ jsx("span", { children: t("analysis_ads") })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "flex gap-3 mt-4 text-[#FF5F00]", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-zinc-600", children: "004" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    t("fixing_signal"),
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "inline-block w-2 h-4 bg-[#FF5F00] animate-blink align-middle ml-1" })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-white font-['Space_Grotesk'] text-xl md:text-2xl font-bold", children: t("market_ignores_noise") }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 mt-12 pb-12 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "h-[1px] bg-white/10 flex-grow" }),
        /* @__PURE__ */ jsx("span", { className: "text-zinc-500 font-['Inter'] text-xs uppercase tracking-widest font-semibold", children: t("operational_capabilities") }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] bg-white/10 flex-grow" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]", children: [
        /* @__PURE__ */ jsxs(HomeSpotlightCard, { className: "md:col-span-2 flex flex-col justify-between", onClick: () => setPage(Page.OPS), children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-white/5 rounded-none border border-white/10 text-[#FF5F00]", children: /* @__PURE__ */ jsx(Activity, { size: 24 }) }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "text-zinc-600 group-hover:text-[#FF5F00] transition-colors" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold font-['Space_Grotesk'] text-white mb-3 uppercase", children: t("youtube_ops") }),
            /* @__PURE__ */ jsx("p", { className: "text-zinc-400 font-['Inter'] text-sm leading-relaxed max-w-md", children: t("youtube_ops_desc") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(HomeSpotlightCard, { className: "flex flex-col justify-between", onClick: () => setPage(Page.OPS), children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsx("div", { className: "p-3 bg-white/5 rounded-none border border-white/10 text-[#FF5F00]", children: /* @__PURE__ */ jsx(Target, { size: 24 }) }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold font-['Space_Grotesk'] text-white mb-3 uppercase", children: t("paid_warfare") }),
            /* @__PURE__ */ jsx("p", { className: "text-zinc-400 font-['Inter'] text-sm leading-relaxed", children: t("paid_warfare_desc") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(HomeSpotlightCard, { className: "flex flex-col justify-between", onClick: () => setPage(Page.OPS), children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsx("div", { className: "p-3 bg-white/5 rounded-none border border-white/10 text-[#FF5F00]", children: /* @__PURE__ */ jsx(Zap, { size: 24 }) }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold font-['Space_Grotesk'] text-white mb-3 uppercase", children: t("data_intel") }),
            /* @__PURE__ */ jsx("p", { className: "text-zinc-400 font-['Inter'] text-sm leading-relaxed", children: t("data_intel_desc") })
          ] })
        ] }),
        /* @__PURE__ */ jsx(HomeSpotlightCard, { className: "md:col-span-2 flex items-center justify-center bg-[#111]", onClick: () => setPage(Page.LOGS), children: /* @__PURE__ */ jsxs("div", { className: "text-center group-hover:scale-105 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#FF5F00] font-['Inter'] text-xs mb-3 font-semibold tracking-wider", children: t("validated_results") }),
          /* @__PURE__ */ jsxs("h3", { className: "text-3xl md:text-4xl font-black font-['Space_Grotesk'] text-white uppercase", children: [
            t("view_mission_logs"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "inline ml-2" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(ZDivider, {})
  ] });
};
const SpotlightCard = ({ title, subtitle, description, id, icon, delay }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleFocus = () => {
    setOpacity(1);
  };
  const handleBlur = () => {
    setOpacity(0);
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref: divRef,
      onMouseMove: handleMouseMove,
      onMouseEnter: handleFocus,
      onMouseLeave: handleBlur,
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay },
      className: "relative h-full overflow-hidden border border-white/10 bg-[#0A0A0A] p-8 md:p-12 group",
      "data-hover": "true",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100",
            style: {
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 95, 0, 0.15), transparent 40%)`
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col h-full justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-8", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00] font-mono text-xs", children: id }),
              /* @__PURE__ */ jsx("div", { className: "text-gray-500 group-hover:text-[#FF5F00] transition-colors", children: icon })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-3xl font-['Space_Grotesk'] font-bold text-white mb-2 uppercase leading-none", children: title }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 mb-6 font-['Space_Grotesk']", children: subtitle }),
            /* @__PURE__ */ jsx("div", { className: "w-12 h-[1px] bg-[#FF5F00] mb-6" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-mono text-sm leading-relaxed", children: description })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsx(ArrowRight, { className: "text-white/20 group-hover:text-[#FF5F00] transition-colors" }) })
        ] })
      ]
    }
  );
};
const Ops = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 pt-32 pb-20", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-white mb-4 uppercase", children: t("ops_page.title") }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-mono text-sm", children: t("ops_page.subtitle") }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-6", children: /* @__PURE__ */ jsx(Target, { className: "text-[#333] w-12 h-12 stroke-[1]" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[minmax(300px,auto)]", children: [
      /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsx(
        SpotlightCard,
        {
          id: "Service ID: 01",
          title: t("ops_page.service_01.title"),
          subtitle: t("ops_page.service_01.subtitle"),
          description: t("ops_page.service_01.desc"),
          icon: /* @__PURE__ */ jsx(Eye, { size: 32 }),
          delay: 0.1
        }
      ) }),
      /* @__PURE__ */ jsx(
        SpotlightCard,
        {
          id: "Service ID: 02",
          title: t("ops_page.service_02.title"),
          subtitle: t("ops_page.service_02.subtitle"),
          description: t("ops_page.service_02.desc"),
          icon: /* @__PURE__ */ jsx(Target, { size: 32 }),
          delay: 0.2
        }
      ),
      /* @__PURE__ */ jsx(
        SpotlightCard,
        {
          id: "Service ID: 03",
          title: t("ops_page.service_03.title"),
          subtitle: t("ops_page.service_03.subtitle"),
          description: t("ops_page.service_03.desc"),
          icon: /* @__PURE__ */ jsx(Database, { size: 32 }),
          delay: 0.3
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-20 border-t border-white/10 pt-12 grid grid-cols-1 md:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-white", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-['Space_Grotesk'] text-[#FF5F00] mb-2", children: t("ops_page.unit_01") }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-4", children: t("ops_page.unit_01_title") }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-mono text-sm leading-relaxed", children: t("ops_page.unit_01_desc") }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-6 space-y-4 font-mono text-sm text-gray-400", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00]", children: ">" }),
            " Thumbnail CTR Maximization: High-contrast visual composition."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00]", children: ">" }),
            " Title SEO Injection: Keyword dominance for search rank."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00]", children: ">" }),
            " Retention Analysis: Drop-off point identification."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00]", children: ">" }),
            " Channel Strategy: Content pillars & scheduling."
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "mt-8 bg-[#FF5F00] text-black font-bold px-8 py-3 uppercase text-sm hover:bg-white transition-colors", "data-hover": "true", children: t("ops_page.deploy_unit_01") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-white", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-['Space_Grotesk'] text-[#FF5F00] mb-2", children: t("ops_page.unit_02") }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-4", children: t("ops_page.unit_02_title") }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-mono text-sm leading-relaxed", children: t("ops_page.unit_02_desc") }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-6 space-y-4 font-mono text-sm text-gray-400", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00]", children: ">" }),
            " Meta Ads Scaling: Aggressive testing structures."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00]", children: ">" }),
            " AI Creative Generation: Rapid iteration using Midjourney/Gemini."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00]", children: ">" }),
            " Attribution Bridge: Custom App linking Meta to GA4."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00]", children: ">" }),
            " ROAS Optimization: Profit-first bidding strategies."
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "mt-8 bg-[#FF5F00] text-black font-bold px-8 py-3 uppercase text-sm hover:bg-white transition-colors", "data-hover": "true", children: t("ops_page.deploy_unit_02") })
      ] })
    ] })
  ] });
};
const cases = [
  { id: "01", client: "DELFI AUSED", tag: "YouTube Management", result: "Audience Retention", image: "https://picsum.photos/800/400?grayscale&random=1" },
  { id: "02", client: "COINARY LTD", tag: "Growth at Scale", result: "Subscriber Growth", image: "https://picsum.photos/800/400?grayscale&random=2" },
  { id: "03", client: "BETBITS CASINO", tag: "Ads Performance", result: "ROI Maximization", image: "https://picsum.photos/800/400?grayscale&random=3" },
  { id: "04", client: "MIX ON TV", tag: "Streaming Infra", result: "Live Event Production", image: "https://picsum.photos/800/400?grayscale&random=4" }
];
const Logs = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 pt-32 pb-20", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-16 text-center",
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-white uppercase mb-2", children: t("mission_logs") }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-mono text-sm", children: t("verified_results") })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-0 border-t border-white/10", children: cases.map((item, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        transition: { delay: index * 0.1 },
        className: "group relative border-b border-white/10 bg-[#050505] hover:bg-[#0a0a0a] transition-colors p-8 md:p-12 cursor-pointer overflow-hidden",
        "data-hover": "true",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-baseline justify-between gap-6 relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-['Space_Grotesk'] font-bold text-white group-hover:text-[#FF5F00] transition-colors uppercase", children: item.client }),
              /* @__PURE__ */ jsx("p", { className: "text-[#FF5F00] font-mono text-sm mt-1", children: item.tag })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 md:text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 font-mono block mb-1", children: t("objective") }),
              /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-lg", children: item.result })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 md:text-right", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 font-mono block mb-1", children: t("status") }),
              /* @__PURE__ */ jsx("span", { className: `inline-block px-2 py-1 text-xs font-bold text-black ${index === 2 ? "bg-[#FF5F00]" : "bg-[#10B981]"}`, children: index === 2 ? "Ongoing" : "Success" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 h-full w-1/3 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none mix-blend-screen", children: /* @__PURE__ */ jsx("img", { src: item.image, alt: item.client, className: "h-full w-full object-cover grayscale" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-12 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-10 group-hover:translate-x-0", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-white text-xs border border-white/20 px-4 py-2", children: t("access_file") }) })
        ]
      },
      item.id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-24", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-white text-3xl font-['Space_Grotesk'] font-bold text-center mb-12 uppercase", children: t("recent_deployments") }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((n) => {
        var _a2;
        return /* @__PURE__ */ jsxs("div", { className: "aspect-square bg-[#111] relative group overflow-hidden border border-white/5", children: [
          /* @__PURE__ */ jsx("img", { src: `https://picsum.photos/400/400?grayscale&random=${n + 10}`, className: "w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500", alt: "Gallery" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-white font-bold font-['Space_Grotesk'] uppercase text-lg", children: ((_a2 = cases[n - 1]) == null ? void 0 : _a2.client) || "CONFIDENTIAL" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xs font-mono", children: [
              "Status: ",
              n === 4 ? "Live" : n === 3 ? "Secured" : n === 2 ? "Scaled" : "Viral"
            ] })
          ] })
        ] }, n);
      }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsx("button", { className: "bg-[#FF5F00] text-black font-bold px-12 py-4 uppercase tracking-widest hover:bg-white transition-colors", "data-hover": "true", children: t("view_all_logs") }) })
    ] })
  ] });
};
const Lab = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 pt-32 pb-20", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "mb-20 text-center",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00] font-mono", children: "[" }),
            /* @__PURE__ */ jsx(Cpu, { className: "text-[#FF5F00]", size: 20 }),
            /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00] font-mono", children: "]" })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-white uppercase", children: t("rd_division") }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-mono mt-4", children: t("rd_desc") })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-white/10 p-8 lg:p-12 bg-[#080808] relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 opacity-10 pointer-events-none", style: {
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        } }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { x: -50, opacity: 0 },
            whileInView: { x: 0, opacity: 1 },
            className: "relative z-10",
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-6 inline-block bg-[#FF5F00]/10 border border-[#FF5F00] px-3 py-1 text-[#FF5F00] text-xs font-mono uppercase tracking-wider", children: "Internal Tool V2.0" }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl text-white font-['Space_Grotesk'] font-bold mb-4", children: t("zeroed_analytics_hub") }),
              /* @__PURE__ */ jsx("h3", { className: "text-white/70 text-xl font-bold mb-6", children: t("cross_platform_attribution") }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-mono text-sm leading-relaxed mb-6", children: t("hub_desc") }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 border border-white/10 bg-black/50 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[#FF5F00] text-sm font-bold mb-1", children: t("why_it_matters") }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs", children: t("hub_why") })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            whileInView: { opacity: 1, scale: 1 },
            className: "relative z-10 h-[300px] border border-dashed border-gray-700 bg-black flex items-center justify-center p-4",
            children: [
              /* @__PURE__ */ jsx("img", { src: "https://picsum.photos/600/400?grayscale", className: "absolute inset-0 w-full h-full object-cover opacity-50", alt: "Schematic" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-20 flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-2 border-white flex items-center justify-center bg-black", children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "META" }) }),
                /* @__PURE__ */ jsx("div", { className: "h-[2px] w-12 bg-[#FF5F00] animate-pulse" }),
                /* @__PURE__ */ jsx("div", { className: "w-20 h-20 border-2 border-[#FF5F00] flex items-center justify-center bg-black rounded-full", children: /* @__PURE__ */ jsx(Workflow, { className: "text-[#FF5F00]" }) }),
                /* @__PURE__ */ jsx("div", { className: "h-[2px] w-12 bg-[#FF5F00] animate-pulse" }),
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-2 border-white flex items-center justify-center bg-black", children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "GA4" }) })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-white/10 p-8 lg:p-12 bg-[#080808]", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            whileInView: { opacity: 1, scale: 1 },
            className: "relative z-10 order-2 lg:order-1 h-[300px] bg-[#111] p-6 font-mono text-xs text-green-500 overflow-hidden border border-gray-800",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "opacity-80", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  ">",
                  " Initializing Gemini API connection..."
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  ">",
                  " Model: gemini-pro-1.5"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-white mb-2", children: [
                  ">",
                  ' Input: "Viral Finance Short"'
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-[#FF5F00] mb-2", children: [
                  ">",
                  " Analyzing Top 100 performing videos..."
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  ">",
                  " Generating Structure:"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pl-4 border-l border-gray-700 mt-2 text-gray-400", children: [
                  /* @__PURE__ */ jsx("p", { children: '1. Hook (0-3s): "Stop losing money on gas fees." (Visual: Wallet Burning)' }),
                  /* @__PURE__ */ jsx("p", { children: "2. Retention (3-15s): Explain Layer 2 solution comparison." }),
                  /* @__PURE__ */ jsx("p", { children: '3. CT (End): "Link in bio for whitelist."' })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 right-4 animate-pulse w-3 h-6 bg-green-500" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { x: 50, opacity: 0 },
            whileInView: { x: 0, opacity: 1 },
            className: "relative z-10 order-1 lg:order-2",
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-6 inline-block bg-[#FF5F00]/10 border border-[#FF5F00] px-3 py-1 text-[#FF5F00] text-xs font-mono uppercase tracking-wider", children: "Alpha Build" }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl text-white font-['Space_Grotesk'] font-bold mb-4", children: t("seo_script_gen") }),
              /* @__PURE__ */ jsx("h3", { className: "text-white/70 text-xl font-bold mb-6", children: t("automated_content") }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-mono text-sm leading-relaxed mb-6", children: t("script_desc") }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 border border-white/10 bg-black/50 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[#FF5F00] text-sm font-bold mb-1", children: t("why_it_matters") }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs", children: t("script_why") })
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
};
const Initiate = () => {
  const { t } = useTranslation();
  const [status2, setStatus] = useState("idle");
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
    }, 2e3);
  };
  if (status2 === "sent") {
    return /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 pt-32 h-screen flex flex-col items-center justify-center text-center", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        className: "border border-[#FF5F00] p-12 bg-black/80 backdrop-blur-xl",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl text-[#FF5F00] font-mono font-bold mb-4", children: t("transmission_complete") }),
          /* @__PURE__ */ jsx("p", { className: "text-white font-mono text-sm", children: t("operatives_analyze") }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-mono text-xs mt-4", children: t("stand_by") }),
          /* @__PURE__ */ jsx("button", { onClick: () => setStatus("idle"), className: "mt-8 text-white underline font-mono text-xs hover:text-[#FF5F00]", "data-hover": "true", children: t("new_transmission") })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 pt-32 pb-20 min-h-screen flex flex-col justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto w-full", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-5xl font-['Space_Grotesk'] font-bold text-white uppercase mb-2", children: t("initiate_protocol") }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-mono text-xs", children: t("secure_line") })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.form,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.2 },
        onSubmit: handleSubmit,
        className: "bg-[#0a0a0a] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-[2px] bg-[#FF5F00] opacity-20 animate-pulse" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8 font-mono", children: [
            /* @__PURE__ */ jsxs("div", { className: "group", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[#FF5F00] text-xs mb-2 tracking-widest", children: t("enter_id") }),
              /* @__PURE__ */ jsx("input", { type: "text", required: true, className: "w-full bg-transparent border-b border-gray-800 text-white p-2 focus:border-[#FF5F00] focus:outline-none transition-colors rounded-none", placeholder: "Required" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "group", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[#FF5F00] text-xs mb-2 tracking-widest", children: t("target_url") }),
              /* @__PURE__ */ jsx("input", { type: "url", className: "w-full bg-transparent border-b border-gray-800 text-white p-2 focus:border-[#FF5F00] focus:outline-none transition-colors rounded-none", placeholder: "https://" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "group", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[#FF5F00] text-xs mb-4 tracking-widest", children: t("select_protocol") }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer group-hover:text-white text-gray-400", "data-hover": "true", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", className: "accent-[#FF5F00] w-4 h-4 rounded-none bg-transparent border-gray-600" }),
                  /* @__PURE__ */ jsx("span", { children: "YouTube Ops" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer group-hover:text-white text-gray-400", "data-hover": "true", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", className: "accent-[#FF5F00] w-4 h-4 rounded-none bg-transparent border-gray-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Paid Scaling" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer group-hover:text-white text-gray-400", "data-hover": "true", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", className: "accent-[#FF5F00] w-4 h-4 rounded-none bg-transparent border-gray-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Custom Dev" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "group", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[#FF5F00] text-xs mb-2 tracking-widest", children: t("mission_brief") }),
              /* @__PURE__ */ jsx("textarea", { rows: 4, className: "w-full bg-[#111] border border-gray-800 text-white p-4 focus:border-[#FF5F00] focus:outline-none transition-colors rounded-none text-sm resize-none", placeholder: "Describe your current bottleneck..." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(
              "button",
              {
                disabled: status2 === "sending",
                className: "w-full bg-[#FF5F00] hover:bg-white text-black font-bold font-['Space_Grotesk'] py-4 uppercase tracking-widest transition-all hover:scale-[1.01] flex justify-center items-center gap-2",
                "data-hover": "true",
                children: status2 === "sending" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("span", { className: "animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" }),
                  t("uploading")
                ] }) : t("transmit_data")
              }
            ) })
          ] })
        ]
      }
    )
  ] }) });
};
const tacticalMessages = [
  "INITIALIZING CORE...",
  "ESTABLISHING SECURE CONNECTION...",
  "LOADING ASSETS...",
  "OPTIMIZING SIGNALS...",
  "TARGET ACQUIRED"
];
const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % tacticalMessages.length);
    }, 350);
    const duration = 2200;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          clearInterval(messageInterval);
          onComplete();
          return 100;
        }
        return next;
      });
    }, intervalTime);
    return () => {
      clearInterval(timer);
      clearInterval(messageInterval);
    };
  }, [onComplete]);
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[9999] flex flex-col", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "relative w-full h-1/2 bg-[#050505] border-b border-white/5",
        initial: { y: 0 },
        exit: {
          y: "-100%",
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          // Custom easing for heavy/cinematic feel
        }
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "relative w-full h-1/2 bg-[#050505] border-t border-white/5",
        initial: { y: 0 },
        exit: {
          y: "100%",
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
        }
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "absolute inset-0 flex flex-col items-center justify-center z-10 text-white pointer-events-none",
        exit: { opacity: 0, transition: { duration: 0.3 } },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md px-6 flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00] font-mono text-xs animate-pulse", children: "SYSTEM_BOOT" }),
              /* @__PURE__ */ jsx("span", { className: "font-['Space_Grotesk'] font-black text-8xl leading-none", children: Math.floor(count).toString().padStart(2, "0") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full h-1 bg-zinc-900 mb-4 overflow-hidden", children: /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "h-full bg-[#FF5F00]",
                style: { width: `${count}%` }
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-wider", children: [
              /* @__PURE__ */ jsx("span", { className: "text-white", children: tacticalMessages[messageIndex] }),
              /* @__PURE__ */ jsx("span", { children: "MEM: 64TB" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-12 w-full text-center opacity-10", children: /* @__PURE__ */ jsx("span", { className: "font-['Space_Grotesk'] text-[15vw] leading-none text-zinc-800 select-none", children: "LOADING" }) })
        ]
      }
    )
  ] });
};
const SEO = ({
  title = "ZEROED | Precision Growth",
  description = "High-end ultra-precision growth agency. We deploy tactical digital strategies for high-risk verticals.",
  image = "https://zeroedgrowth.com/og-image.png",
  url = "https://zeroedgrowth.com",
  type = "website"
}) => {
  const siteTitle = title === "ZEROED | Precision Growth" ? title : `${title} | ZEROED`;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: siteTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: siteTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:url", content: url }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: siteTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Zeroed Growth",
      "url": "https://zeroedgrowth.com",
      "logo": "https://zeroedgrowth.com/og-image.png",
      "description": "High-end ultra-precision growth agency. We deploy tactical digital strategies for high-risk verticals.",
      "sameAs": [
        "https://twitter.com/zeroedgrowth",
        "https://instagram.com/zeroedgrowth"
      ]
    }) })
  ] });
};
const App = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(Page.HOME);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 1e-3
  });
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);
  const renderPage = () => {
    switch (page) {
      case Page.HOME:
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SEO, {}),
          /* @__PURE__ */ jsx(Home, { setPage })
        ] });
      case Page.OPS:
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SEO, { title: "Operations", description: "Our tactical operations and service offerings.", url: "https://zeroedgrowth.com/ops" }),
          /* @__PURE__ */ jsx(Ops, {})
        ] });
      case Page.LOGS:
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SEO, { title: "Logs", description: "Mission logs and case studies of deployed strategies.", url: "https://zeroedgrowth.com/logs" }),
          /* @__PURE__ */ jsx(Logs, {})
        ] });
      case Page.LAB:
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SEO, { title: "The Lab", description: "Experimental R&D division. Testing grounds for next-gen growth vectors.", url: "https://zeroedgrowth.com/lab" }),
          /* @__PURE__ */ jsx(Lab, {})
        ] });
      case Page.INITIATE:
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SEO, { title: "Initiate Procedure", description: "Begin the onboarding protocol. Contact Zeroed Systems.", url: "https://zeroedgrowth.com/initiate" }),
          /* @__PURE__ */ jsx(Initiate, {})
        ] });
      default:
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SEO, {}),
          /* @__PURE__ */ jsx(Home, { setPage })
        ] });
    }
  };
  return /* @__PURE__ */ jsxs(HelmetProvider, { children: [
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: loading && /* @__PURE__ */ jsx(Preloader, { onComplete: () => setLoading(false) }) }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen text-white font-sans selection:bg-[#FF5F00] selection:text-black bg-[#050505] flex flex-col", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "fixed top-0 left-0 right-0 h-1 bg-[#FF5F00] origin-left z-50",
          style: { scaleX }
        }
      ),
      /* @__PURE__ */ jsx(GridBackground, {}),
      /* @__PURE__ */ jsx(SniperCursor, {}),
      /* @__PURE__ */ jsx(Header, { activePage: page, setPage }),
      /* @__PURE__ */ jsx("main", { className: "relative z-10 flex-grow flex flex-col", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10, filter: "blur(5px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          exit: { opacity: 0, y: -10, filter: "blur(5px)" },
          transition: { duration: 0.4, ease: "easeInOut" },
          className: "flex-grow",
          children: renderPage()
        },
        page
      ) }) }),
      /* @__PURE__ */ jsx("footer", { className: "relative z-10 w-full bg-[#050505] pt-20 pb-6 overflow-hidden border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 flex flex-col gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-zinc-500 font-mono text-xs max-w-xs", children: [
            /* @__PURE__ */ jsxs("p", { className: "mb-4 text-white", children: [
              t("system_status"),
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-[#FF5F00]", children: "OPERATIONAL" })
            ] }),
            /* @__PURE__ */ jsx("p", { children: t("deploying_solutions") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right text-[10px] text-zinc-600 font-mono uppercase tracking-widest hidden md:block", children: [
            /* @__PURE__ */ jsx("p", { children: t("copyright") }),
            /* @__PURE__ */ jsx("p", { children: t("location") })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full select-none leading-none", children: /* @__PURE__ */ jsx("h1", { className: "text-[18vw] font-black font-['Space_Grotesk'] text-[#111] text-center tracking-tighter leading-none mix-blend-difference", children: "ZEROED" }) }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden text-center text-[10px] text-zinc-600 font-mono uppercase tracking-widest flex flex-col items-center gap-4", children: /* @__PURE__ */ jsx("p", { children: t("copyright") }) })
      ] }) })
    ] })
  ] });
};
const system_status$1 = "SYSTEM STATUS: OPERATIONAL";
const deploying_solutions$1 = "Deploying tactical growth solutions for high-risk verticals since 2024.";
const copyright$1 = "Zeroed Systems © 2025";
const location$1 = "Loc: AR / GLOBAL";
const protocol_online$1 = "Protocol: Z-01 // Online";
const precision_over_noise$1 = "PRECISION\nOVER NOISE";
const data_driven_growth$1 = "Data-Driven Growth for Creators & High-Risk Brands. We eliminate visual chaos to maximize signal.";
const get_zeroed$1 = "Get Zeroed";
const critical_error$1 = "CRITICAL ERROR DETECTED: SIGNAL_LOSS";
const analysis_content$1 = "Analysis: Great Content + Bad Packaging == 0 Views";
const analysis_ads$1 = "Analysis: High Ad Spend + Generic Creative == Negative ROI";
const fixing_signal$1 = "Fixing signal...";
const market_ignores_noise$1 = "The market doesn't ignore content. It ignores noise.";
const operational_capabilities$1 = "Operational Capabilities";
const youtube_ops$1 = "YouTube Ops";
const youtube_ops_desc$1 = "Complete channel architecture. Retention engineering, SEO injection, and thumbnail CTR maximization.";
const paid_warfare$1 = "Paid Warfare";
const paid_warfare_desc$1 = "Aggressive Meta & TikTok scaling protocols.";
const data_intel$1 = "Data Intel";
const data_intel_desc$1 = "Attribution beyond standard pixels. Server-side tracking.";
const validated_results$1 = "VALIDATED RESULTS";
const view_mission_logs$1 = "View Mission Logs";
const mission_logs$1 = "Mission Logs";
const verified_results$1 = "Verified results from field operations.";
const objective$1 = "Objective";
const status$1 = "Status";
const access_file$1 = "Access File";
const recent_deployments$1 = "Recent Deployments";
const view_all_logs$1 = "View All Mission Logs";
const rd_division$1 = "R&D Division";
const rd_desc$1 = "We don't rely on standard tools. We build our own.";
const zeroed_analytics_hub$1 = "Zeroed Analytics Hub V2";
const cross_platform_attribution$1 = "Cross-Platform Attribution";
const hub_desc$1 = "A custom-built application that connects Meta Ads Manager API with Google Analytics 4 raw data.";
const why_it_matters$1 = "Why it matters:";
const hub_why$1 = 'It reveals the "Dark ROI" that standard pixels miss. Essential for Betting/Crypto apps.';
const seo_script_gen$1 = "SEO Script Gen Alpha";
const automated_content$1 = "Automated Content Structure";
const script_desc$1 = "Powered by Google Gemini. This tool analyzes top-performing videos in a niche and generates optimized script structures, tags, and title variations in seconds.";
const script_why$1 = "Speed. We iterate content 10x faster than manual agencies.";
const initiate_protocol$1 = "Initiate Protocol";
const secure_line$1 = "Secure Line Established. 256-bit Encryption Active.";
const enter_id$1 = "> ENTER IDENTIFICATION (NAME/BRAND)";
const target_url$1 = "> TARGET URL";
const select_protocol$1 = "> SELECT PROTOCOL";
const mission_brief$1 = "> MISSION BRIEF";
const transmit_data$1 = "[ TRANSMIT DATA ]";
const uploading$1 = "UPLOADING...";
const transmission_complete$1 = "TRANSMISSION COMPLETE";
const operatives_analyze$1 = "Our operatives will analyze your data packet.";
const stand_by$1 = "Stand by for encrypted response.";
const new_transmission$1 = "New Transmission";
const nav$1 = { "ops": "OPS", "logs": "LOGS", "lab": "LAB", "initiate": "INITIATE" };
const ops_page$1 = { "title": "Operational Capabilities", "subtitle": "Deploying tactical solutions for organic and paid growth.", "unit_01": "Unit 01: YouTube Visual Ops", "unit_01_title": "WE DON'T EDIT. WE ENGINEER RETENTION.", "unit_01_desc": "Standard editors cut video. We build assets designed for the algorithm. From high-contrast thumbnails to SEO-injected scripts.", "deploy_unit_01": "Deploy Unit 01", "unit_02": "Unit 02: Paid Media & Data", "unit_02_title": "HIGH-RISK SCALING PROTOCOLS.", "unit_02_desc": "Specialized in high-friction niches (Casino, Crypto, Info-products). We bypass standard tracking limitations using proprietary AI bridges.", "deploy_unit_02": "Deploy Unit 02", "service_01": { "title": "Visual Engineering & Retention", "subtitle": "YouTube Visual Ops", "desc": "Standard editors cut video. We build assets designed for the algorithm. From high-contrast thumbnails to SEO-injected scripts." }, "service_02": { "title": "Meta Scaling & AI Attribution", "subtitle": "Paid Media & Data", "desc": "Specialized in high-friction niches. We bypass standard tracking limitations." }, "service_03": { "title": "Custom Tracking Infrastructure", "subtitle": "Dev Ops", "desc": "Building proprietary bridges between ad platforms and your CRM." } };
const translationEN = {
  system_status: system_status$1,
  deploying_solutions: deploying_solutions$1,
  copyright: copyright$1,
  location: location$1,
  protocol_online: protocol_online$1,
  precision_over_noise: precision_over_noise$1,
  data_driven_growth: data_driven_growth$1,
  get_zeroed: get_zeroed$1,
  critical_error: critical_error$1,
  analysis_content: analysis_content$1,
  analysis_ads: analysis_ads$1,
  fixing_signal: fixing_signal$1,
  market_ignores_noise: market_ignores_noise$1,
  operational_capabilities: operational_capabilities$1,
  youtube_ops: youtube_ops$1,
  youtube_ops_desc: youtube_ops_desc$1,
  paid_warfare: paid_warfare$1,
  paid_warfare_desc: paid_warfare_desc$1,
  data_intel: data_intel$1,
  data_intel_desc: data_intel_desc$1,
  validated_results: validated_results$1,
  view_mission_logs: view_mission_logs$1,
  mission_logs: mission_logs$1,
  verified_results: verified_results$1,
  objective: objective$1,
  status: status$1,
  access_file: access_file$1,
  recent_deployments: recent_deployments$1,
  view_all_logs: view_all_logs$1,
  rd_division: rd_division$1,
  rd_desc: rd_desc$1,
  zeroed_analytics_hub: zeroed_analytics_hub$1,
  cross_platform_attribution: cross_platform_attribution$1,
  hub_desc: hub_desc$1,
  why_it_matters: why_it_matters$1,
  hub_why: hub_why$1,
  seo_script_gen: seo_script_gen$1,
  automated_content: automated_content$1,
  script_desc: script_desc$1,
  script_why: script_why$1,
  initiate_protocol: initiate_protocol$1,
  secure_line: secure_line$1,
  enter_id: enter_id$1,
  target_url: target_url$1,
  select_protocol: select_protocol$1,
  mission_brief: mission_brief$1,
  transmit_data: transmit_data$1,
  uploading: uploading$1,
  transmission_complete: transmission_complete$1,
  operatives_analyze: operatives_analyze$1,
  stand_by: stand_by$1,
  new_transmission: new_transmission$1,
  nav: nav$1,
  ops_page: ops_page$1
};
const system_status = "ESTADO DEL SISTEMA: OPERATIVO";
const deploying_solutions = "Desplegando soluciones tácticas de crecimiento para verticales de alto riesgo desde 2024.";
const copyright = "Zeroed Systems © 2025";
const location = "Ubic: AR / GLOBAL";
const protocol_online = "Protocolo: Z-01 // En línea";
const precision_over_noise = "PRECISIÓN\nSOBRE RUIDO";
const data_driven_growth = "Crecimiento impulsado por datos para creadores y marcas de alto riesgo. Eliminamos el caos visual para maximizar la señal.";
const get_zeroed = "Iniciar Zeroed";
const critical_error = "ERROR CRÍTICO DETECTADO: PÉRDIDA_DE_SEÑAL";
const analysis_content = "Análisis: Gran Contenido + Mal Empaquetado == 0 Vistas";
const analysis_ads = "Análisis: Alto Gasto en Anuncios + Creatividad Genérica == ROI Negativo";
const fixing_signal = "Arreglando señal...";
const market_ignores_noise = "El mercado no ignora el contenido. Ignora el ruido.";
const operational_capabilities = "Capacidades Operativas";
const youtube_ops = "Operaciones YouTube";
const youtube_ops_desc = "Arquitectura completa del canal. Ingeniería de retención, inyección SEO y maximización de CTR en miniaturas.";
const paid_warfare = "Guerra Pagada";
const paid_warfare_desc = "Protocolos agresivos de escalado en Meta y TikTok.";
const data_intel = "Inteligencia de Datos";
const data_intel_desc = "Atribución más allá de los píxeles estándar. Rastreo del lado del servidor.";
const validated_results = "RESULTADOS VALIDADOS";
const view_mission_logs = "Ver Registros de Misión";
const mission_logs = "Registros de Misión";
const verified_results = "Resultados verificados de operaciones de campo.";
const objective = "Objetivo";
const status = "Estado";
const access_file = "Acceder Archivo";
const recent_deployments = "Despliegues Recientes";
const view_all_logs = "Ver Todos los Registros";
const rd_division = "División I+D";
const rd_desc = "No dependemos de herramientas estándar. Construimos las nuestras.";
const zeroed_analytics_hub = "Zeroed Analytics Hub V2";
const cross_platform_attribution = "Atribución Multi-Plataforma";
const hub_desc = "Una aplicación personalizada que conecta la API de Meta Ads Manager con datos crudos de Google Analytics 4.";
const why_it_matters = "Por qué importa:";
const hub_why = 'Revela el "ROI Oscuro" que los píxeles estándar pierden. Esencial para aplicaciones de Apuestas/Cripto.';
const seo_script_gen = "Generador de Guiones SEO Alpha";
const automated_content = "Estructura de Contenido Automatizada";
const script_desc = "Impulsado por Google Gemini. Esta herramienta analiza los videos de mejor rendimiento en un nicho y genera estructuras de guiones optimizadas, etiquetas y variaciones de títulos en segundos.";
const script_why = "Velocidad. Iteramos contenido 10 veces más rápido que las agencias manuales.";
const initiate_protocol = "Iniciar Protocolo";
const secure_line = "Línea Segura Establecida. Encriptación de 256 bits Activa.";
const enter_id = "> INGRESAR IDENTIFICACIÓN (NOMBRE/MARCA)";
const target_url = "> URL OBJETIVO";
const select_protocol = "> SELECCIONAR PROTOCOLO";
const mission_brief = "> RESUMEN DE MISIÓN";
const transmit_data = "[ TRANSMITIR DATOS ]";
const uploading = "SUBIENDO...";
const transmission_complete = "TRANSMISIÓN COMPLETA";
const operatives_analyze = "Nuestros operativos analizarán su paquete de datos.";
const stand_by = "Espere por respuesta encriptada.";
const new_transmission = "Nueva Transmisión";
const nav = { "ops": "OPS", "logs": "REGISTROS", "lab": "LAB", "initiate": "INICIAR" };
const ops_page = { "title": "Capacidades Operativas", "subtitle": "Desplegando soluciones tácticas para crecimiento orgánico y pagado.", "unit_01": "Unidad 01: YouTube Visual Ops", "unit_01_title": "NO EDITAMOS. HICIMOS INGENIERÍA DE RETENCIÓN.", "unit_01_desc": "Los editores estándar cortan video. Nosotros construimos activos diseñados para el algoritmo. Desde miniaturas de alto contraste hasta guiones con inyección SEO.", "deploy_unit_01": "Desplegar Unidad 01", "unit_02": "Unidad 02: Medios Pagados y Datos", "unit_02_title": "PROTOCOLOS DE ESCALADO DE ALTO RIESGO.", "unit_02_desc": "Especializados en nichos de alta fricción (Casino, Cripto, Info-productos). Evitamos las limitaciones de rastreo estándar usando puentes de IA propietarios.", "deploy_unit_02": "Desplegar Unidad 02", "service_01": { "title": "Ingeniería Visual y Retención", "subtitle": "YouTube Visual Ops", "desc": "Los editores estándar cortan video. Nosotros construimos activos diseñados para el algoritmo. Desde miniaturas de alto contraste hasta guiones con inyección SEO." }, "service_02": { "title": "Escalado Meta y Atribución IA", "subtitle": "Medios Pagados y Datos", "desc": "Especializados en nichos de alta fricción. Evitamos las limitaciones de rastreo estándar." }, "service_03": { "title": "Infraestructura de Rastreo Personalizada", "subtitle": "Dev Ops", "desc": "Construyendo puentes propietarios entre plataformas de anuncios y su CRM." } };
const translationES = {
  system_status,
  deploying_solutions,
  copyright,
  location,
  protocol_online,
  precision_over_noise,
  data_driven_growth,
  get_zeroed,
  critical_error,
  analysis_content,
  analysis_ads,
  fixing_signal,
  market_ignores_noise,
  operational_capabilities,
  youtube_ops,
  youtube_ops_desc,
  paid_warfare,
  paid_warfare_desc,
  data_intel,
  data_intel_desc,
  validated_results,
  view_mission_logs,
  mission_logs,
  verified_results,
  objective,
  status,
  access_file,
  recent_deployments,
  view_all_logs,
  rd_division,
  rd_desc,
  zeroed_analytics_hub,
  cross_platform_attribution,
  hub_desc,
  why_it_matters,
  hub_why,
  seo_script_gen,
  automated_content,
  script_desc,
  script_why,
  initiate_protocol,
  secure_line,
  enter_id,
  target_url,
  select_protocol,
  mission_brief,
  transmit_data,
  uploading,
  transmission_complete,
  operatives_analyze,
  stand_by,
  new_transmission,
  nav,
  ops_page
};
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};
i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false
  }
});
function render() {
  const helmetContext = {};
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(App, {}) })
  );
  return { html, helmet: helmetContext.helmet };
}
export {
  render
};
