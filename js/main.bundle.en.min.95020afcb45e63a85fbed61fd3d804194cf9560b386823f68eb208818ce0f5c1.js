const alert = document.getElementById('page-alert')
const closeBtn = document.getElementById('page-alert-btn-close')
if (alert !== null && closeBtn !== null) {
  const version = alert.getAttribute('data-page-alert-version') || 'unknown'
  const hideAlert = sessionStorage.getItem(`page-alert-${version}`) !== null
  if (hideAlert) {
    alert.classList.add('d-none')
  }

  closeBtn.addEventListener('click', () => {
    sessionStorage.setItem(`page-alert-${version}`, 'seen')
    alert.classList.add('d-none')
  })
}

;
// Adapted from https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/google_analytics.html


  
    
        var doNotTrack = false;
        if (false) {
          var dnt = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack);
          var doNotTrack = (dnt == "1" || dnt == "yes");
        }
        if (!doNotTrack) {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JJZZ5F2KN4');
        }
    
  

;
function reveal () {
  const reveals = document.querySelectorAll('.reveal')

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight
    const elementTop = reveals[i].getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active')
      reveals[i].classList.remove('reveal')
    } else {
      reveals[i].classList.remove('active')
    }
  }
}

window.addEventListener('scroll', reveal)

;
/*
Source:
  - https://simplernerd.com/hugo-add-copy-to-clipboard-button/
*/

const svgCopy =
  '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>'
const svgCheck =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>'

const addCopyButtons = (clipboard) => {
  // 1. Look for pre > code elements in the DOM
  document.querySelectorAll('pre > code').forEach((codeBlock) => {
    // 2. Create a button that will trigger a copy operation
    const button = document.createElement('button')
    button.className = 'clipboard-button'
    button.setAttribute('data-toast-target', 'toast-copied-code-message')
    button.setAttribute('aria-label', 'copy to clipboard')
    button.type = 'button'
    button.innerHTML = svgCopy
    button.addEventListener('click', () => {
      const text = codeBlock.innerText.split('\n').filter(Boolean).join('\n')
      clipboard.writeText(text).then(
        () => {
          button.blur()
          button.innerHTML = svgCheck
          setTimeout(() => (button.innerHTML = svgCopy), 2000)
        },
        // eslint-disable-next-line n/handle-callback-err
        (error) => (button.innerHTML = 'Error')
      )
    })
    // 3. Append the button directly before the pre tag
    const pre = codeBlock.parentNode
    pre.parentNode.insertBefore(button, pre)
  })
}

if (navigator && navigator.clipboard) {
  addCopyButtons(navigator.clipboard)
}

document.querySelectorAll('[data-clipboard]').forEach(trigger => {
  const text = trigger.getAttribute('data-clipboard')
  trigger.addEventListener('click', () => {
    navigator.clipboard.writeText(text)
  })
})

;
const url = new URL(window.location.href)
const menu = url.searchParams.get('menu')
const child = url.searchParams.get('child')
const menuItems = document.querySelectorAll('[data-nav="main"]')

if (menu !== null) {
  menuItems.forEach(element => {
    element.classList.remove('active')
  })

  const targetMainItems = document.querySelectorAll(`[data-nav-main="${menu}"]:not([data-nav-child])`)
  targetMainItems.forEach(element => {
    element.classList.add('active')
  })

  const targetChildItems = document.querySelectorAll(`[data-nav-main="${menu}"][data-nav-child="${child}"]`)
  targetChildItems.forEach(element => {
    element.classList.add('active')
  })
}

;
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory());
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const elementMap = new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }
      const instanceMap = elementMap.get(element);

      // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);

      // free up element references if there are no instances left for an element
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend';

  /**
   * Properly escape IDs selectors to handle weird IDs
   * @param {string} selector
   * @returns {string}
   */
  const parseSelector = selector => {
    if (selector && window.CSS && window.CSS.escape) {
      // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };

  // Shout-out Angus Croll (https://goo.gl/pxwQGp)
  const toType = object => {
    if (object === null || object === undefined) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  /**
   * Public Util API
   */

  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));
    return prefix;
  };
  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    }

    // Get transition-duration of the element
    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);

    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }

    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  const isElement$1 = object => {
    if (!object || typeof object !== 'object') {
      return false;
    }
    if (typeof object.jquery !== 'undefined') {
      object = object[0];
    }
    return typeof object.nodeType !== 'undefined';
  };
  const getElement = object => {
    // it's a jQuery object or a node element
    if (isElement$1(object)) {
      return object.jquery ? object[0] : object;
    }
    if (typeof object === 'string' && object.length > 0) {
      return document.querySelector(parseSelector(object));
    }
    return null;
  };
  const isVisible = element => {
    if (!isElement$1(element) || element.getClientRects().length === 0) {
      return false;
    }
    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
    // Handle `details` element as its content may falsie appear visible when it is closed
    const closedDetails = element.closest('details:not([open])');
    if (!closedDetails) {
      return elementIsVisible;
    }
    if (closedDetails !== element) {
      const summary = element.closest('summary');
      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }
      if (summary === null) {
        return false;
      }
    }
    return elementIsVisible;
  };
  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains('disabled')) {
      return true;
    }
    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }
    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };
  const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
      return null;
    }

    // Can find the shadow root otherwise it'll return the document
    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }
    if (element instanceof ShadowRoot) {
      return element;
    }

    // when we don't find a shadow root
    if (!element.parentNode) {
      return null;
    }
    return findShadowRoot(element.parentNode);
  };
  const noop = () => {};

  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */
  const reflow = element => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };
  const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return window.jQuery;
    }
    return null;
  };
  const DOMContentLoadedCallbacks = [];
  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          for (const callback of DOMContentLoadedCallbacks) {
            callback();
          }
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  const isRTL = () => document.documentElement.dir === 'rtl';
  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue;
  };
  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };

  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */
  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement);

    // if the element does not exist in the list return an element
    // depending on the direction and if cycle is allowed
    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }
    index += shouldGetNext ? 1 : -1;
    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage
  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

  /**
   * Private methods
   */

  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element
      });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, {
            delegateTarget: target
          });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === 'string';
    // TODO: tooltip passes `false` instead of selector, so we need to check
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

    // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does
    if (originalTypeEvent in customEvents) {
      const wrapFunction = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }
  const EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },
    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },
    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }
      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith('.');
      if (typeof callable !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!Object.keys(storeElementEvent).length) {
          return;
        }
        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }
      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }
      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },
    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      const evt = hydrateObj(new Event(event, {
        bubbles,
        cancelable: true
      }), args);
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  function hydrateObj(obj, meta = {}) {
    for (const [key, value] of Object.entries(meta)) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  function normalizeData(value) {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === '' || value === 'null') {
      return null;
    }
    if (typeof value !== 'string') {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }
  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/config.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Class definition
   */

  class Config {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement$1(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

      return {
        ...this.constructor.Default,
        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
        ...(isElement$1(element) ? Manipulator.getDataAttributes(element) : {}),
        ...(typeof config === 'object' ? config : {})
      };
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const [property, expectedTypes] of Object.entries(configTypes)) {
        const value = config[property];
        const valueType = isElement$1(value) ? 'element' : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const VERSION = '5.3.3';

  /**
   * Class definition
   */

  class BaseComponent extends Config {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }

    // Public
    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }

    // Static
    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');
    if (!selector || selector === '#') {
      let hrefAttribute = element.getAttribute('href');

      // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273
      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
        return null;
      }

      // Just in case some CMS puts out a full URL with the anchor appended
      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
      }
      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    }
    return selector ? selector.split(',').map(sel => parseSelector(sel)).join(',') : null;
  };
  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    },
    getSelectorFromElement(element) {
      const selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target);

      // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
      instance[method]();
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$f = 'alert';
  const DATA_KEY$a = 'bs.alert';
  const EVENT_KEY$b = `.${DATA_KEY$a}`;
  const EVENT_CLOSE = `close${EVENT_KEY$b}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
  const CLASS_NAME_FADE$5 = 'fade';
  const CLASS_NAME_SHOW$8 = 'show';

  /**
   * Class definition
   */

  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$f;
    }

    // Public
    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
      if (closeEvent.defaultPrevented) {
        return;
      }
      this._element.classList.remove(CLASS_NAME_SHOW$8);
      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    }

    // Private
    _destroyElement() {
      this._element.remove();
      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }

  /**
   * Data API implementation
   */

  enableDismissTrigger(Alert, 'close');

  /**
   * jQuery
   */

  defineJQueryPlugin(Alert);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$e = 'button';
  const DATA_KEY$9 = 'bs.button';
  const EVENT_KEY$a = `.${DATA_KEY$9}`;
  const DATA_API_KEY$6 = '.data-api';
  const CLASS_NAME_ACTIVE$3 = 'active';
  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;

  /**
   * Class definition
   */

  class Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$e;
    }

    // Public
    toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Button.getOrCreateInstance(this);
        if (config === 'toggle') {
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Button);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/swipe.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$d = 'swipe';
  const EVENT_KEY$9 = '.bs.swipe';
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
  const POINTER_TYPE_TOUCH = 'touch';
  const POINTER_TYPE_PEN = 'pen';
  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
  const SWIPE_THRESHOLD = 40;
  const Default$c = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
  };
  const DefaultType$c = {
    endCallback: '(function|null)',
    leftCallback: '(function|null)',
    rightCallback: '(function|null)'
  };

  /**
   * Class definition
   */

  class Swipe extends Config {
    constructor(element, config) {
      super();
      this._element = element;
      if (!element || !Swipe.isSupported()) {
        return;
      }
      this._config = this._getConfig(config);
      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);
      this._initEvents();
    }

    // Getters
    static get Default() {
      return Default$c;
    }
    static get DefaultType() {
      return DefaultType$c;
    }
    static get NAME() {
      return NAME$d;
    }

    // Public
    dispose() {
      EventHandler.off(this._element, EVENT_KEY$9);
    }

    // Private
    _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    }
    _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }
      this._handleSwipe();
      execute(this._config.endCallback);
    }
    _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const absDeltaX = Math.abs(this._deltaX);
      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }
      const direction = absDeltaX / this._deltaX;
      this._deltaX = 0;
      if (!direction) {
        return;
      }
      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
      }
    }
    _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    }

    // Static
    static isSupported() {
      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$c = 'carousel';
  const DATA_KEY$8 = 'bs.carousel';
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$5 = '.data-api';
  const ARROW_LEFT_KEY$1 = 'ArrowLeft';
  const ARROW_RIGHT_KEY$1 = 'ArrowRight';
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  const ORDER_NEXT = 'next';
  const ORDER_PREV = 'prev';
  const DIRECTION_LEFT = 'left';
  const DIRECTION_RIGHT = 'right';
  const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
  const EVENT_SLID = `slid${EVENT_KEY$8}`;
  const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
  const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
  const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
  const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const CLASS_NAME_CAROUSEL = 'carousel';
  const CLASS_NAME_ACTIVE$2 = 'active';
  const CLASS_NAME_SLIDE = 'slide';
  const CLASS_NAME_END = 'carousel-item-end';
  const CLASS_NAME_START = 'carousel-item-start';
  const CLASS_NAME_NEXT = 'carousel-item-next';
  const CLASS_NAME_PREV = 'carousel-item-prev';
  const SELECTOR_ACTIVE = '.active';
  const SELECTOR_ITEM = '.carousel-item';
  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
  const SELECTOR_ITEM_IMG = '.carousel-item img';
  const SELECTOR_INDICATORS = '.carousel-indicators';
  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
  };
  const Default$b = {
    interval: 5000,
    keyboard: true,
    pause: 'hover',
    ride: false,
    touch: true,
    wrap: true
  };
  const DefaultType$b = {
    interval: '(number|boolean)',
    // TODO:v6 remove boolean support
    keyboard: 'boolean',
    pause: '(string|boolean)',
    ride: '(boolean|string)',
    touch: 'boolean',
    wrap: 'boolean'
  };

  /**
   * Class definition
   */

  class Carousel extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._interval = null;
      this._activeElement = null;
      this._isSliding = false;
      this.touchTimeout = null;
      this._swipeHelper = null;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._addEventListeners();
      if (this._config.ride === CLASS_NAME_CAROUSEL) {
        this.cycle();
      }
    }

    // Getters
    static get Default() {
      return Default$b;
    }
    static get DefaultType() {
      return DefaultType$b;
    }
    static get NAME() {
      return NAME$c;
    }

    // Public
    next() {
      this._slide(ORDER_NEXT);
    }
    nextWhenVisible() {
      // FIXME TODO use `document.visibilityState`
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }
    prev() {
      this._slide(ORDER_PREV);
    }
    pause() {
      if (this._isSliding) {
        triggerTransitionEnd(this._element);
      }
      this._clearInterval();
    }
    cycle() {
      this._clearInterval();
      this._updateInterval();
      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }
    _maybeEnableCycle() {
      if (!this._config.ride) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
        return;
      }
      this.cycle();
    }
    to(index) {
      const items = this._getItems();
      if (index > items.length - 1 || index < 0) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }
      const activeIndex = this._getItemIndex(this._getActive());
      if (activeIndex === index) {
        return;
      }
      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
      this._slide(order, items[index]);
    }
    dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }
      super.dispose();
    }

    // Private
    _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    }
    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
      }
      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
      }
      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    }
    _addTouchEventListeners() {
      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
        EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
      }
      const endCallBack = () => {
        if (this._config.pause !== 'hover') {
          return;
        }

        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        this.pause();
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }
        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      };
      const swipeConfig = {
        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
        endCallback: endCallBack
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    }
    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      const direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        this._slide(this._directionToOrder(direction));
      }
    }
    _getItemIndex(element) {
      return this._getItems().indexOf(element);
    }
    _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute('aria-current');
      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
        newActiveIndicator.setAttribute('aria-current', 'true');
      }
    }
    _updateInterval() {
      const element = this._activeElement || this._getActive();
      if (!element) {
        return;
      }
      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    }
    _slide(order, element = null) {
      if (this._isSliding) {
        return;
      }
      const activeElement = this._getActive();
      const isNext = order === ORDER_NEXT;
      const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
      if (nextElement === activeElement) {
        return;
      }
      const nextElementIndex = this._getItemIndex(nextElement);
      const triggerEvent = eventName => {
        return EventHandler.trigger(this._element, eventName, {
          relatedTarget: nextElement,
          direction: this._orderToDirection(order),
          from: this._getItemIndex(activeElement),
          to: nextElementIndex
        });
      };
      const slideEvent = triggerEvent(EVENT_SLIDE);
      if (slideEvent.defaultPrevented) {
        return;
      }
      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        // TODO: change tests that use empty divs to avoid this check
        return;
      }
      const isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;
      this._setActiveIndicatorElement(nextElementIndex);
      this._activeElement = nextElement;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        triggerEvent(EVENT_SLID);
      };
      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
      if (isCycling) {
        this.cycle();
      }
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    }
    _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }
    _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }
    _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }
    _directionToOrder(direction) {
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }
      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }
    _orderToDirection(order) {
      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Carousel.getOrCreateInstance(this, config);
        if (typeof config === 'number') {
          data.to(config);
          return;
        }
        if (typeof config === 'string') {
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }
    event.preventDefault();
    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute('data-bs-slide-to');
    if (slideIndex) {
      carousel.to(slideIndex);
      carousel._maybeEnableCycle();
      return;
    }
    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
      carousel.next();
      carousel._maybeEnableCycle();
      return;
    }
    carousel.prev();
    carousel._maybeEnableCycle();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    for (const carousel of carousels) {
      Carousel.getOrCreateInstance(carousel);
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Carousel);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$b = 'collapse';
  const DATA_KEY$7 = 'bs.collapse';
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const DATA_API_KEY$4 = '.data-api';
  const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
  const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
  const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
  const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
  const CLASS_NAME_SHOW$7 = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  const WIDTH = 'width';
  const HEIGHT = 'height';
  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  const Default$a = {
    parent: null,
    toggle: true
  };
  const DefaultType$a = {
    parent: '(null|element)',
    toggle: 'boolean'
  };

  /**
   * Class definition
   */

  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
      for (const elem of toggleList) {
        const selector = SelectorEngine.getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }
      this._initializeChildren();
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }
      if (this._config.toggle) {
        this.toggle();
      }
    }

    // Getters
    static get Default() {
      return Default$a;
    }
    static get DefaultType() {
      return DefaultType$a;
    }
    static get NAME() {
      return NAME$b;
    }

    // Public
    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }
    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      let activeChildren = [];

      // find active children
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
          toggle: false
        }));
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }
      const dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
        this._element.style[dimension] = '';
        EventHandler.trigger(this._element, EVENT_SHOWN$6);
      };
      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      const dimension = this._getDimension();
      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      for (const trigger of this._triggerArray) {
        const element = SelectorEngine.getElementFromSelector(trigger);
        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(this._element, EVENT_HIDDEN$6);
      };
      this._element.style[dimension] = '';
      this._queueCallback(complete, this._element, true);
    }
    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    }

    // Private
    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values
      config.parent = getElement(config.parent);
      return config;
    }
    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }
    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
      for (const element of children) {
        const selected = SelectorEngine.getElementFromSelector(element);
        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }
    _getFirstLevelChildren(selector) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      // remove children if greater depth
      return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute('aria-expanded', isOpen);
      }
    }

    // Static
    static jQueryInterface(config) {
      const _config = {};
      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function () {
        const data = Collapse.getOrCreateInstance(this, _config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }
    for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Collapse);

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  const applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$2,
    requires: ['computeStyles']
  };

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function getUAString() {
    var uaData = navigator.userAgentData;

    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
      return uaData.brands.map(function (item) {
        return item.brand + "/" + item.version;
      }).join(' ');
    }

    return navigator.userAgent;
  }

  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false;
    }

    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }

    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;

    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }

    var _ref = isElement(element) ? getWindow(element) : window,
        visualViewport = _ref.visualViewport;

    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x: x,
      y: y
    };
  }

  // means it doesn't take into account transforms.

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle$1(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v;
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$1(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  const arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$1,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x,
        y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets,
        isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
        x = _offsets$x === void 0 ? 0 : _offsets$x,
        _offsets$y = offsets.y,
        y = _offsets$y === void 0 ? 0 : _offsets$y;

    var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
        offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
        offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x: x,
      y: y
    }, getWindow(popper)) : {
      x: x,
      y: y
    };

    x = _ref4.x;
    y = _ref4.y;

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref5) {
    var state = _ref5.state,
        options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration,
      isFixed: state.options.strategy === 'fixed'
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  const computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  var passive = {
    passive: true
  };

  function effect(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  const eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
  };

  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();

      if (layoutViewport || !layoutViewport && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle$1(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle$1(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === 'fixed');
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$strategy = _options.strategy,
        strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  const flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  const hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  const offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  const popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis) {
      var _offsetModifierState$;

      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = offset + overflow[mainSide];
      var max$1 = offset - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _offsetModifierState$2;

      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _len = altAxis === 'y' ? 'height' : 'width';

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  const preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  } // Returns the composite rect of an element relative to its offsetParent.
  // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          });
          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {
            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });

          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {
        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref) {
          var name = _ref.name,
              _ref$options = _ref.options,
              options = _ref$options === void 0 ? {} : _ref$options,
              effect = _ref.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }
  var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers$1
  }); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  const Popper = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    afterMain,
    afterRead,
    afterWrite,
    applyStyles: applyStyles$1,
    arrow: arrow$1,
    auto,
    basePlacements,
    beforeMain,
    beforeRead,
    beforeWrite,
    bottom,
    clippingParents,
    computeStyles: computeStyles$1,
    createPopper,
    createPopperBase: createPopper$2,
    createPopperLite: createPopper$1,
    detectOverflow,
    end,
    eventListeners,
    flip: flip$1,
    hide: hide$1,
    left,
    main,
    modifierPhases,
    offset: offset$1,
    placements,
    popper,
    popperGenerator,
    popperOffsets: popperOffsets$1,
    preventOverflow: preventOverflow$1,
    read,
    reference,
    right,
    start,
    top,
    variationPlacements,
    viewport,
    write
  }, Symbol.toStringTag, { value: 'Module' }));

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$a = 'dropdown';
  const DATA_KEY$6 = 'bs.dropdown';
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = '.data-api';
  const ESCAPE_KEY$2 = 'Escape';
  const TAB_KEY$1 = 'Tab';
  const ARROW_UP_KEY$1 = 'ArrowUp';
  const ARROW_DOWN_KEY$1 = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const CLASS_NAME_SHOW$6 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPEND = 'dropend';
  const CLASS_NAME_DROPSTART = 'dropstart';
  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR = '.navbar';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
  const PLACEMENT_TOPCENTER = 'top';
  const PLACEMENT_BOTTOMCENTER = 'bottom';
  const Default$9 = {
    autoClose: true,
    boundary: 'clippingParents',
    display: 'dynamic',
    offset: [0, 2],
    popperConfig: null,
    reference: 'toggle'
  };
  const DefaultType$9 = {
    autoClose: '(boolean|string)',
    boundary: '(string|element)',
    display: 'string',
    offset: '(array|string|function)',
    popperConfig: '(null|object|function)',
    reference: '(string|element|object)'
  };

  /**
   * Class definition
   */

  class Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode; // dropdown wrapper
      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    }

    // Getters
    static get Default() {
      return Default$9;
    }
    static get DefaultType() {
      return DefaultType$9;
    }
    static get NAME() {
      return NAME$a;
    }

    // Public
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._createPopper();

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }
      this._element.focus();
      this._element.setAttribute('aria-expanded', true);
      this._menu.classList.add(CLASS_NAME_SHOW$6);
      this._element.classList.add(CLASS_NAME_SHOW$6);
      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    }
    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      this._completeHide(relatedTarget);
    }
    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }

    // Private
    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }
      if (this._popper) {
        this._popper.destroy();
      }
      this._menu.classList.remove(CLASS_NAME_SHOW$6);
      this._element.classList.remove(CLASS_NAME_SHOW$6);
      this._element.setAttribute('aria-expanded', 'false');
      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    }
    _getConfig(config) {
      config = super._getConfig(config);
      if (typeof config.reference === 'object' && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }
      return config;
    }
    _createPopper() {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
      }
      let referenceElement = this._element;
      if (this._config.reference === 'parent') {
        referenceElement = this._parent;
      } else if (isElement$1(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }
      const popperConfig = this._getPopperConfig();
      this._popper = createPopper(referenceElement, this._menu, popperConfig);
    }
    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    }
    _getPlacement() {
      const parentDropdown = this._parent;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      }

      // We need to trim the value because custom properties can also include spaces
      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }
      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }
      return offset;
    }
    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      };

      // Disable Popper if we have a static display or Dropdown is in Navbar
      if (this._inNavbar || this._config.display === 'static') {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
      };
    }
    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
      if (!items.length) {
        return;
      }

      // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
        return;
      }
      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
      for (const toggle of openToggles) {
        const context = Dropdown.getInstance(toggle);
        if (!context || context._config.autoClose === false) {
          continue;
        }
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);
        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
          continue;
        }

        // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }
        const relatedTarget = {
          relatedTarget: context._element
        };
        if (event.type === 'click') {
          relatedTarget.clickEvent = event;
        }
        context._completeHide(relatedTarget);
      }
    }
    static dataApiKeydownHandler(event) {
      // If not an UP | DOWN | ESCAPE key => not a dropdown command
      // If input/textarea && if key is other than ESCAPE => not a dropdown command

      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY$2;
      const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }
      if (isInput && !isEscapeEvent) {
        return;
      }
      event.preventDefault();

      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
      const instance = Dropdown.getOrCreateInstance(getToggleButton);
      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();
        instance._selectMenuItem(event);
        return;
      }
      if (instance._isShown()) {
        // else is escape and we check if it is shown
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Dropdown);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$9 = 'backdrop';
  const CLASS_NAME_FADE$4 = 'fade';
  const CLASS_NAME_SHOW$5 = 'show';
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
  const Default$8 = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: 'body' // give the choice to place backdrop under different elements
  };
  const DefaultType$8 = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)'
  };

  /**
   * Class definition
   */

  class Backdrop extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }

    // Getters
    static get Default() {
      return Default$8;
    }
    static get DefaultType() {
      return DefaultType$8;
    }
    static get NAME() {
      return NAME$9;
    }

    // Public
    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._append();
      const element = this._getElement();
      if (this._config.isAnimated) {
        reflow(element);
      }
      element.classList.add(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        execute(callback);
      });
    }
    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }
    dispose() {
      if (!this._isAppended) {
        return;
      }
      EventHandler.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }

    // Private
    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div');
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }
        this._element = backdrop;
      }
      return this._element;
    }
    _configAfterMerge(config) {
      // use getElement() with the default "body" to get a fresh Element on each instantiation
      config.rootElement = getElement(config.rootElement);
      return config;
    }
    _append() {
      if (this._isAppended) {
        return;
      }
      const element = this._getElement();
      this._config.rootElement.append(element);
      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }
    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$8 = 'focustrap';
  const DATA_KEY$5 = 'bs.focustrap';
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
  const TAB_KEY = 'Tab';
  const TAB_NAV_FORWARD = 'forward';
  const TAB_NAV_BACKWARD = 'backward';
  const Default$7 = {
    autofocus: true,
    trapElement: null // The element to trap focus inside of
  };
  const DefaultType$7 = {
    autofocus: 'boolean',
    trapElement: 'element'
  };

  /**
   * Class definition
   */

  class FocusTrap extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }

    // Getters
    static get Default() {
      return Default$7;
    }
    static get DefaultType() {
      return DefaultType$7;
    }
    static get NAME() {
      return NAME$8;
    }

    // Public
    activate() {
      if (this._isActive) {
        return;
      }
      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }
      EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
      EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
      this._isActive = true;
    }
    deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$5);
    }

    // Private
    _handleFocusin(event) {
      const {
        trapElement
      } = this._config;
      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }
      const elements = SelectorEngine.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }
    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';
  const PROPERTY_PADDING = 'padding-right';
  const PROPERTY_MARGIN = 'margin-right';

  /**
   * Class definition
   */

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    }

    // Public
    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
    hide() {
      const width = this.getWidth();
      this._disableOverFlow();
      // give padding to element to balance the hidden scrollbar width
      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
      // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
    }
    reset() {
      this._resetElementAttributes(this._element, 'overflow');
      this._resetElementAttributes(this._element, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }

    // Private
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');
      this._element.style.overflow = 'hidden';
    }
    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();
      const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }
        this._saveInitialAttribute(element, styleProperty);
        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);
      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProperty, actualValue);
      }
    }
    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = element => {
        const value = Manipulator.getDataAttribute(element, styleProperty);
        // We only want to remove the property if the value is `null`; the value can also be zero
        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }
        Manipulator.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _applyManipulationCallback(selector, callBack) {
      if (isElement$1(selector)) {
        callBack(selector);
        return;
      }
      for (const sel of SelectorEngine.find(selector, this._element)) {
        callBack(sel);
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$7 = 'modal';
  const DATA_KEY$4 = 'bs.modal';
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const DATA_API_KEY$2 = '.data-api';
  const ESCAPE_KEY$1 = 'Escape';
  const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
  const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
  const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
  const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE$3 = 'fade';
  const CLASS_NAME_SHOW$4 = 'show';
  const CLASS_NAME_STATIC = 'modal-static';
  const OPEN_SELECTOR$1 = '.modal.show';
  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  const Default$6 = {
    backdrop: true,
    focus: true,
    keyboard: true
  };
  const DefaultType$6 = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
  };

  /**
   * Class definition
   */

  class Modal extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();
      this._addEventListeners();
    }

    // Getters
    static get Default() {
      return Default$6;
    }
    static get DefaultType() {
      return DefaultType$6;
    }
    static get NAME() {
      return NAME$7;
    }

    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._isTransitioning = true;
      this._scrollBar.hide();
      document.body.classList.add(CLASS_NAME_OPEN);
      this._adjustDialog();
      this._backdrop.show(() => this._showElement(relatedTarget));
    }
    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      this._isTransitioning = true;
      this._focustrap.deactivate();
      this._element.classList.remove(CLASS_NAME_SHOW$4);
      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }
    dispose() {
      EventHandler.off(window, EVENT_KEY$4);
      EventHandler.off(this._dialog, EVENT_KEY$4);
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }

    // Private
    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _showElement(relatedTarget) {
      // try to append dynamic modal
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }
      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.scrollTop = 0;
      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW$4);
      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }
        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$4, {
          relatedTarget
        });
      };
      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
        if (event.key !== ESCAPE_KEY$1) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE$1, () => {
        if (this._isShown && !this._isTransitioning) {
          this._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
        EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
          if (this._element !== event.target || this._element !== event2.target) {
            return;
          }
          if (this._config.backdrop === 'static') {
            this._triggerBackdropTransition();
            return;
          }
          if (this._config.backdrop) {
            this.hide();
          }
        });
      });
    }
    _hideModal() {
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      this._isTransitioning = false;
      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);
        this._resetAdjustments();
        this._scrollBar.reset();
        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
      });
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }
    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const initialOverflowY = this._element.style.overflowY;
      // return if the following background transition hasn't yet completed
      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }
      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }
      this._element.classList.add(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.classList.remove(CLASS_NAME_STATIC);
        this._queueCallback(() => {
          this._element.style.overflowY = initialOverflowY;
        }, this._dialog);
      }, this._dialog);
      this._element.focus();
    }

    /**
     * The following methods are used to handle overflowing modals
     */

    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const scrollbarWidth = this._scrollBar.getWidth();
      const isBodyOverflowing = scrollbarWidth > 0;
      if (isBodyOverflowing && !isModalOverflowing) {
        const property = isRTL() ? 'paddingLeft' : 'paddingRight';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
      if (!isBodyOverflowing && isModalOverflowing) {
        const property = isRTL() ? 'paddingRight' : 'paddingLeft';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    }

    // Static
    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](relatedTarget);
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    EventHandler.one(target, EVENT_SHOW$4, showEvent => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }
      EventHandler.one(target, EVENT_HIDDEN$4, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    });

    // avoid conflict when clicking modal toggler while another one is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }
    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);

  /**
   * jQuery
   */

  defineJQueryPlugin(Modal);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$6 = 'offcanvas';
  const DATA_KEY$3 = 'bs.offcanvas';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const DATA_API_KEY$1 = '.data-api';
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const ESCAPE_KEY = 'Escape';
  const CLASS_NAME_SHOW$3 = 'show';
  const CLASS_NAME_SHOWING$1 = 'showing';
  const CLASS_NAME_HIDING = 'hiding';
  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
  const OPEN_SELECTOR = '.offcanvas.show';
  const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
  const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  const Default$5 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  const DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    scroll: 'boolean'
  };

  /**
   * Class definition
   */

  class Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._addEventListeners();
    }

    // Getters
    static get Default() {
      return Default$5;
    }
    static get DefaultType() {
      return DefaultType$5;
    }
    static get NAME() {
      return NAME$6;
    }

    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._backdrop.show();
      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.classList.add(CLASS_NAME_SHOWING$1);
      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }
        this._element.classList.add(CLASS_NAME_SHOW$3);
        this._element.classList.remove(CLASS_NAME_SHOWING$1);
        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };
      this._queueCallback(completeCallBack, this._element, true);
    }
    hide() {
      if (!this._isShown) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.add(CLASS_NAME_HIDING);
      this._backdrop.hide();
      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
        this._element.removeAttribute('aria-modal');
        this._element.removeAttribute('role');
        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }
        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      };
      this._queueCallback(completeCallback, this._element, true);
    }
    dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }

    // Private
    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === 'static') {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }
        this.hide();
      };

      // 'static' option will be translated to true, and booleans will keep their value
      const isVisible = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible ? clickCallback : null
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
      });
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      // focus on trigger when it is closed
      if (isVisible(this)) {
        this.focus();
      }
    });

    // avoid conflict when clicking a toggler of an offcanvas, while another is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }
    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
      if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);

  /**
   * jQuery
   */

  defineJQueryPlugin(Offcanvas);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  // js-docs-start allow-list
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    dd: [],
    div: [],
    dl: [],
    dt: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  // js-docs-end allow-list

  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

  /**
   * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
   * contexts.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
   */
  // eslint-disable-next-line unicorn/better-regex
  const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
  const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();
    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
      }
      return true;
    }

    // Check if a regular expression validates the attribute.
    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }
    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
      return sanitizeFunction(unsafeHtml);
    }
    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();
      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }
      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }
    return createdDocument.body.innerHTML;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/template-factory.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$5 = 'TemplateFactory';
  const Default$4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: '',
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: '<div></div>'
  };
  const DefaultType$4 = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string'
  };
  const DefaultContentType = {
    entry: '(string|element|function|null)',
    selector: '(string|element)'
  };

  /**
   * Class definition
   */

  class TemplateFactory extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    }

    // Getters
    static get Default() {
      return Default$4;
    }
    static get DefaultType() {
      return DefaultType$4;
    }
    static get NAME() {
      return NAME$5;
    }

    // Public
    getContent() {
      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(content) {
      this._checkContent(content);
      this._config.content = {
        ...this._config.content,
        ...content
      };
      return this;
    }
    toHtml() {
      const templateWrapper = document.createElement('div');
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }
      const template = templateWrapper.children[0];
      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
      if (extraClass) {
        template.classList.add(...extraClass.split(' '));
      }
      return template;
    }

    // Private
    _typeCheckConfig(config) {
      super._typeCheckConfig(config);
      this._checkContent(config.content);
    }
    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig({
          selector,
          entry: content
        }, DefaultContentType);
      }
    }
    _setContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);
      if (!templateElement) {
        return;
      }
      content = this._resolvePossibleFunction(content);
      if (!content) {
        templateElement.remove();
        return;
      }
      if (isElement$1(content)) {
        this._putElementInTemplate(getElement(content), templateElement);
        return;
      }
      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }
      templateElement.textContent = content;
    }
    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this]);
    }
    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = '';
        templateElement.append(element);
        return;
      }
      templateElement.textContent = element.textContent;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$4 = 'tooltip';
  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  const CLASS_NAME_FADE$2 = 'fade';
  const CLASS_NAME_MODAL = 'modal';
  const CLASS_NAME_SHOW$2 = 'show';
  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = 'hide.bs.modal';
  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';
  const EVENT_HIDE$2 = 'hide';
  const EVENT_HIDDEN$2 = 'hidden';
  const EVENT_SHOW$2 = 'show';
  const EVENT_SHOWN$2 = 'shown';
  const EVENT_INSERTED = 'inserted';
  const EVENT_CLICK$1 = 'click';
  const EVENT_FOCUSIN$1 = 'focusin';
  const EVENT_FOCUSOUT$1 = 'focusout';
  const EVENT_MOUSEENTER = 'mouseenter';
  const EVENT_MOUSELEAVE = 'mouseleave';
  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
  };
  const Default$3 = {
    allowList: DefaultAllowlist,
    animation: true,
    boundary: 'clippingParents',
    container: false,
    customClass: '',
    delay: 0,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    html: false,
    offset: [0, 6],
    placement: 'top',
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    title: '',
    trigger: 'hover focus'
  };
  const DefaultType$3 = {
    allowList: 'object',
    animation: 'boolean',
    boundary: '(string|element)',
    container: '(string|element|boolean)',
    customClass: '(string|function)',
    delay: '(number|object)',
    fallbackPlacements: 'array',
    html: 'boolean',
    offset: '(array|string|function)',
    placement: '(string|function)',
    popperConfig: '(null|object|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string'
  };

  /**
   * Class definition
   */

  class Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      }
      super(element, config);

      // Private
      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null;

      // Protected
      this.tip = null;
      this._setListeners();
      if (!this._config.selector) {
        this._fixTitle();
      }
    }

    // Getters
    static get Default() {
      return Default$3;
    }
    static get DefaultType() {
      return DefaultType$3;
    }
    static get NAME() {
      return NAME$4;
    }

    // Public
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      if (!this._isEnabled) {
        return;
      }
      this._activeTrigger.click = !this._activeTrigger.click;
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this._element.getAttribute('data-bs-original-title')) {
        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
      }
      this._disposePopper();
      super.dispose();
    }
    show() {
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }
      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      // TODO: v6 remove this or make it optional
      this._disposePopper();
      const tip = this._getTipElement();
      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
      const {
        container
      } = this._config;
      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }
      this._popper = this._createPopper(tip);
      tip.classList.add(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }
      const complete = () => {
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
        if (this._isHovered === false) {
          this._leave();
        }
        this._isHovered = false;
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    hide() {
      if (!this._isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
      if (hideEvent.defaultPrevented) {
        return;
      }
      const tip = this._getTipElement();
      tip.classList.remove(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null; // it is a trick to support manual triggering

      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }
        if (!this._isHovered) {
          this._disposePopper();
        }
        this._element.removeAttribute('aria-describedby');
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    update() {
      if (this._popper) {
        this._popper.update();
      }
    }

    // Protected
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }
      return this.tip;
    }
    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml();

      // TODO: remove this check in v6
      if (!tip) {
        return null;
      }
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      // TODO: v6 the following can be achieved with CSS only
      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute('id', tipId);
      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }
      return tip;
    }
    setContent(content) {
      this._newContent = content;
      if (this._isShown()) {
        this._disposePopper();
        this.show();
      }
    }
    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory({
          ...this._config,
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        });
      }
      return this._templateFactory;
    }
    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
      };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    }

    // Private
    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    }
    _createPopper(tip) {
      const placement = execute(this._config.placement, [this, tip, this._element]);
      const attachment = AttachmentMap[placement.toUpperCase()];
      return createPopper(this._element, tip, this._getPopperConfig(attachment));
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }
      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }
      return offset;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this._element]);
    }
    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: 'preSetPlacement',
          enabled: true,
          phase: 'beforeMain',
          fn: data => {
            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
          }
        }]
      };
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
      };
    }
    _setListeners() {
      const triggers = this._config.trigger.split(' ');
      for (const trigger of triggers) {
        if (trigger === 'click') {
          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
          EventHandler.on(this._element, eventIn, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            context._enter();
          });
          EventHandler.on(this._element, eventOut, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            context._leave();
          });
        }
      }
      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };
      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }
    _fixTitle() {
      const title = this._element.getAttribute('title');
      if (!title) {
        return;
      }
      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
        this._element.setAttribute('aria-label', title);
      }
      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
      this._element.removeAttribute('title');
    }
    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }
      this._isHovered = true;
      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }
    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }
      this._isHovered = false;
      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }
    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);
      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }
      config = {
        ...dataAttributes,
        ...(typeof config === 'object' && config ? config : {})
      };
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);
      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }
      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }
      return config;
    }
    _getDelegateConfig() {
      const config = {};
      for (const [key, value] of Object.entries(this._config)) {
        if (this.constructor.Default[key] !== value) {
          config[key] = value;
        }
      }
      config.selector = false;
      config.trigger = 'manual';

      // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`
      return config;
    }
    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tooltip.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * jQuery
   */

  defineJQueryPlugin(Tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$3 = 'popover';
  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';
  const Default$2 = {
    ...Tooltip.Default,
    content: '',
    offset: [0, 8],
    placement: 'right',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
    trigger: 'click'
  };
  const DefaultType$2 = {
    ...Tooltip.DefaultType,
    content: '(null|string|element|function)'
  };

  /**
   * Class definition
   */

  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }
    static get DefaultType() {
      return DefaultType$2;
    }
    static get NAME() {
      return NAME$3;
    }

    // Overrides
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }

    // Private
    _getContentForTemplate() {
      return {
        [SELECTOR_TITLE]: this._getTitle(),
        [SELECTOR_CONTENT]: this._getContent()
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Popover.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * jQuery
   */

  defineJQueryPlugin(Popover);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$2 = 'scrollspy';
  const DATA_KEY$2 = 'bs.scrollspy';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY = '.data-api';
  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_CLICK = `click${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE$1 = 'active';
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  const SELECTOR_TARGET_LINKS = '[href]';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  const Default$1 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: '0px 0px -25%',
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1]
  };
  const DefaultType$1 = {
    offset: '(number|null)',
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: 'string',
    smoothScroll: 'boolean',
    target: 'element',
    threshold: 'array'
  };

  /**
   * Class definition
   */

  class ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element, config);

      // this._element is the observablesContainer and config.target the menu links wrapper
      this._targetLinks = new Map();
      this._observableSections = new Map();
      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
      this._activeTarget = null;
      this._observer = null;
      this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      };
      this.refresh(); // initialize
    }

    // Getters
    static get Default() {
      return Default$1;
    }
    static get DefaultType() {
      return DefaultType$1;
    }
    static get NAME() {
      return NAME$2;
    }

    // Public
    refresh() {
      this._initializeTargetsAndObservables();
      this._maybeEnableSmoothScroll();
      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }
      for (const section of this._observableSections.values()) {
        this._observer.observe(section);
      }
    }
    dispose() {
      this._observer.disconnect();
      super.dispose();
    }

    // Private
    _configAfterMerge(config) {
      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
      config.target = getElement(config.target) || document.body;

      // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
      if (typeof config.threshold === 'string') {
        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
      }
      return config;
    }
    _maybeEnableSmoothScroll() {
      if (!this._config.smoothScroll) {
        return;
      }

      // unregister any previous listeners
      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
        const observableSection = this._observableSections.get(event.target.hash);
        if (observableSection) {
          event.preventDefault();
          const root = this._rootElement || window;
          const height = observableSection.offsetTop - this._element.offsetTop;
          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: 'smooth'
            });
            return;
          }

          // Chrome 60 doesn't support `scrollTo`
          root.scrollTop = height;
        }
      });
    }
    _getNewObserver() {
      const options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver(entries => this._observerCallback(entries), options);
    }

    // The logic of selection
    _observerCallback(entries) {
      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
      const activate = entry => {
        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
        this._process(targetElement(entry));
      };
      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this._activeTarget = null;
          this._clearActiveClass(targetElement(entry));
          continue;
        }
        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        // if we are scrolling down, pick the bigger offsetTop
        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry);
          // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
          if (!parentScrollTop) {
            return;
          }
          continue;
        }

        // if we are scrolling up, pick the smallest offsetTop
        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = new Map();
      this._observableSections = new Map();
      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
      for (const anchor of targetLinks) {
        // ensure that the anchor has an id and is not disabled
        if (!anchor.hash || isDisabled(anchor)) {
          continue;
        }
        const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

        // ensure that the observableSection exists & is visible
        if (isVisible(observableSection)) {
          this._targetLinks.set(decodeURI(anchor.hash), anchor);
          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    }
    _process(target) {
      if (this._activeTarget === target) {
        return;
      }
      this._clearActiveClass(this._config.target);
      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE$1);
      this._activateParents(target);
      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
    _activateParents(target) {
      // Activate dropdown parents
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
        return;
      }
      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
          item.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    }
    _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE$1);
      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
      for (const node of activeNodes) {
        node.classList.remove(CLASS_NAME_ACTIVE$1);
      }
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = ScrollSpy.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
      ScrollSpy.getOrCreateInstance(spy);
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(ScrollSpy);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$1 = 'tab';
  const DATA_KEY$1 = 'bs.tab';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
  const ARROW_LEFT_KEY = 'ArrowLeft';
  const ARROW_RIGHT_KEY = 'ArrowRight';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const HOME_KEY = 'Home';
  const END_KEY = 'End';
  const CLASS_NAME_ACTIVE = 'active';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';
  const CLASS_DROPDOWN = 'dropdown';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
  const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  const SELECTOR_OUTER = '.nav-item, .list-group-item';
  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

  /**
   * Class definition
   */

  class Tab extends BaseComponent {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
      if (!this._parent) {
        return;
        // TODO: should throw exception in v6
        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
      }

      // Set up initial aria attributes
      this._setInitialAttributes(this._parent, this._getChildren());
      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    }

    // Getters
    static get NAME() {
      return NAME$1;
    }

    // Public
    show() {
      // Shows this elem and deactivate the active sibling if exists
      const innerElem = this._element;
      if (this._elemIsActive(innerElem)) {
        return;
      }

      // Search for active tab on same parent to deactivate it
      const active = this._getActiveElem();
      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
        relatedTarget: innerElem
      }) : null;
      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
        relatedTarget: active
      });
      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }
      this._deactivate(active, innerElem);
      this._activate(innerElem, active);
    }

    // Private
    _activate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.add(CLASS_NAME_ACTIVE);
      this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.add(CLASS_NAME_SHOW$1);
          return;
        }
        element.removeAttribute('tabindex');
        element.setAttribute('aria-selected', true);
        this._toggleDropDown(element, true);
        EventHandler.trigger(element, EVENT_SHOWN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();
      this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.remove(CLASS_NAME_SHOW$1);
          return;
        }
        element.setAttribute('aria-selected', false);
        element.setAttribute('tabindex', '-1');
        this._toggleDropDown(element, false);
        EventHandler.trigger(element, EVENT_HIDDEN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
        return;
      }
      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
      event.preventDefault();
      const children = this._getChildren().filter(element => !isDisabled(element));
      let nextActiveElement;
      if ([HOME_KEY, END_KEY].includes(event.key)) {
        nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
      } else {
        const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
        nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
      }
      if (nextActiveElement) {
        nextActiveElement.focus({
          preventScroll: true
        });
        Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }
    _getChildren() {
      // collection of inner elements
      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find(child => this._elemIsActive(child)) || null;
    }
    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, 'role', 'tablist');
      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }
    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);
      const isActive = this._elemIsActive(child);
      const outerElem = this._getOuterElement(child);
      child.setAttribute('aria-selected', isActive);
      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
      }
      if (!isActive) {
        child.setAttribute('tabindex', '-1');
      }
      this._setAttributeIfNotExists(child, 'role', 'tab');

      // set attributes to the related panel too
      this._setInitialAttributesOnTargetPanel(child);
    }
    _setInitialAttributesOnTargetPanel(child) {
      const target = SelectorEngine.getElementFromSelector(child);
      if (!target) {
        return;
      }
      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
      if (child.id) {
        this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
      }
    }
    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);
      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }
      const toggle = (selector, className) => {
        const element = SelectorEngine.findOne(selector, outerElem);
        if (element) {
          element.classList.toggle(className, open);
        }
      };
      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
      outerElem.setAttribute('aria-expanded', open);
    }
    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }
    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    }

    // Try to get the inner element (usually the .nav-link)
    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    }

    // Try to get the outer element (usually the .nav-item)
    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tab.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    Tab.getOrCreateInstance(this).show();
  });

  /**
   * Initialize on focus
   */
  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Tab);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME = 'toast';
  const DATA_KEY = 'bs.toast';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';
  const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  const Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };

  /**
   * Class definition
   */

  class Toast extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;
      this._setListeners();
    }

    // Getters
    static get Default() {
      return Default;
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get NAME() {
      return NAME;
    }

    // Public
    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._clearTimeout();
      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }
      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);
        EventHandler.trigger(this._element, EVENT_SHOWN);
        this._maybeScheduleHide();
      };
      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    hide() {
      if (!this.isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };
      this._element.classList.add(CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    dispose() {
      this._clearTimeout();
      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }
      super.dispose();
    }
    isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    }

    // Private

    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }
      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }
      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }
    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          {
            this._hasMouseInteraction = isInteracting;
            break;
          }
        case 'focusin':
        case 'focusout':
          {
            this._hasKeyboardInteraction = isInteracting;
            break;
          }
      }
      if (isInteracting) {
        this._clearTimeout();
        return;
      }
      const nextElement = event.relatedTarget;
      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }
      this._maybeScheduleHide();
    }
    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Toast.getOrCreateInstance(this, config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](this);
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  enableDismissTrigger(Toast);

  /**
   * jQuery
   */

  defineJQueryPlugin(Toast);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const index_umd = {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip
  };

  return index_umd;

}));
//# sourceMappingURL=bootstrap.bundle.js.map

;
/**!
 * FlexSearch.js v0.7.41 (Bundle)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
(function _f(self){'use strict';try{if(module)self=module}catch(e){}self._factory=_f;var t;function u(a){return"undefined"!==typeof a?a:!0}function v(a){const b=Array(a);for(let c=0;c<a;c++)b[c]=x();return b}function x(){return Object.create(null)}function aa(a,b){return b.length-a.length}function C(a){return"string"===typeof a}function D(a){return"object"===typeof a}function E(a){return"function"===typeof a};function ba(a,b){var c=ca;if(a&&(b&&(a=F(a,b)),this.H&&(a=F(a,this.H)),this.J&&1<a.length&&(a=F(a,this.J)),c||""===c)){b=a.split(c);if(this.filter){a=this.filter;c=b.length;const d=[];for(let e=0,f=0;e<c;e++){const h=b[e];h&&!a[h]&&(d[f++]=h)}a=d}else a=b;return a}return a}const ca=/[\p{Z}\p{S}\p{P}\p{C}]+/u,da=/[\u0300-\u036f]/g;
function ea(a,b){const c=Object.keys(a),d=c.length,e=[];let f="",h=0;for(let g=0,k,m;g<d;g++)k=c[g],(m=a[k])?(e[h++]=G(b?"(?!\\b)"+k+"(\\b|_)":k),e[h++]=m):f+=(f?"|":"")+k;f&&(e[h++]=G(b?"(?!\\b)("+f+")(\\b|_)":"("+f+")"),e[h]="");return e}function F(a,b){for(let c=0,d=b.length;c<d&&(a=a.replace(b[c],b[c+1]),a);c+=2);return a}function G(a){return new RegExp(a,"g")}function fa(a){let b="",c="";for(let d=0,e=a.length,f;d<e;d++)(f=a[d])!==c&&(b+=c=f);return b};var ia={encode:ha,F:!1,G:""};function ha(a){return ba.call(this,(""+a).toLowerCase(),!1)};const ja={},I={};function ka(a){J(a,"add");J(a,"append");J(a,"search");J(a,"update");J(a,"remove")}function J(a,b){a[b+"Async"]=function(){const c=this,d=arguments;var e=d[d.length-1];let f;E(e)&&(f=e,delete d[d.length-1]);e=new Promise(function(h){setTimeout(function(){c.async=!0;const g=c[b].apply(c,d);c.async=!1;h(g)})});return f?(e.then(f),this):e}};function la(a,b,c,d){const e=a.length;let f=[],h,g,k=0;d&&(d=[]);for(let m=e-1;0<=m;m--){const n=a[m],w=n.length,q=x();let r=!h;for(let l=0;l<w;l++){const p=n[l],A=p.length;if(A)for(let B=0,z,y;B<A;B++)if(y=p[B],h){if(h[y]){if(!m)if(c)c--;else if(f[k++]=y,k===b)return f;if(m||d)q[y]=1;r=!0}if(d&&(z=(g[y]||0)+1,g[y]=z,z<e)){const H=d[z-2]||(d[z-2]=[]);H[H.length]=y}}else q[y]=1}if(d)h||(g=q);else if(!r)return[];h=q}if(d)for(let m=d.length-1,n,w;0<=m;m--){n=d[m];w=n.length;for(let q=0,r;q<w;q++)if(r=
n[q],!h[r]){if(c)c--;else if(f[k++]=r,k===b)return f;h[r]=1}}return f}function ma(a,b){const c=x(),d=x(),e=[];for(let f=0;f<a.length;f++)c[a[f]]=1;for(let f=0,h;f<b.length;f++){h=b[f];for(let g=0,k;g<h.length;g++)k=h[g],c[k]&&!d[k]&&(d[k]=1,e[e.length]=k)}return e};function K(a){this.l=!0!==a&&a;this.cache=x();this.h=[]}function na(a,b,c){D(a)&&(a=a.query);let d=this.cache.get(a);d||(d=this.search(a,b,c),this.cache.set(a,d));return d}K.prototype.set=function(a,b){if(!this.cache[a]){var c=this.h.length;c===this.l?delete this.cache[this.h[c-1]]:c++;for(--c;0<c;c--)this.h[c]=this.h[c-1];this.h[0]=a}this.cache[a]=b};K.prototype.get=function(a){const b=this.cache[a];if(this.l&&b&&(a=this.h.indexOf(a))){const c=this.h[a-1];this.h[a-1]=this.h[a];this.h[a]=c}return b};const pa={memory:{charset:"latin:extra",D:3,B:4,m:!1},performance:{D:3,B:3,s:!1,context:{depth:2,D:1}},match:{charset:"latin:extra",G:"reverse"},score:{charset:"latin:advanced",D:20,B:3,context:{depth:3,D:9}},"default":{}};function qa(a,b,c,d,e,f,h,g){setTimeout(function(){const k=a(c?c+"."+d:d,JSON.stringify(h));k&&k.then?k.then(function(){b.export(a,b,c,e,f+1,g)}):b.export(a,b,c,e,f+1,g)})};function L(a,b){if(!(this instanceof L))return new L(a);var c;if(a){C(a)?a=pa[a]:(c=a.preset)&&(a=Object.assign({},c[c],a));c=a.charset;var d=a.lang;C(c)&&(-1===c.indexOf(":")&&(c+=":default"),c=I[c]);C(d)&&(d=ja[d])}else a={};let e,f,h=a.context||{};this.encode=a.encode||c&&c.encode||ha;this.register=b||x();this.D=e=a.resolution||9;this.G=b=c&&c.G||a.tokenize||"strict";this.depth="strict"===b&&h.depth;this.l=u(h.bidirectional);this.s=f=u(a.optimize);this.m=u(a.fastupdate);this.B=a.minlength||1;this.C=
a.boost;this.map=f?v(e):x();this.A=e=h.resolution||1;this.h=f?v(e):x();this.F=c&&c.F||a.rtl;this.H=(b=a.matcher||d&&d.H)&&ea(b,!1);this.J=(b=a.stemmer||d&&d.J)&&ea(b,!0);if(c=b=a.filter||d&&d.filter){c=b;d=x();for(let g=0,k=c.length;g<k;g++)d[c[g]]=1;c=d}this.filter=c;this.cache=(b=a.cache)&&new K(b)}t=L.prototype;t.append=function(a,b){return this.add(a,b,!0)};
t.add=function(a,b,c,d){if(b&&(a||0===a)){if(!d&&!c&&this.register[a])return this.update(a,b);b=this.encode(b);if(d=b.length){const m=x(),n=x(),w=this.depth,q=this.D;for(let r=0;r<d;r++){let l=b[this.F?d-1-r:r];var e=l.length;if(l&&e>=this.B&&(w||!n[l])){var f=M(q,d,r),h="";switch(this.G){case "full":if(2<e){for(f=0;f<e;f++)for(var g=e;g>f;g--)if(g-f>=this.B){var k=M(q,d,r,e,f);h=l.substring(f,g);N(this,n,h,k,a,c)}break}case "reverse":if(1<e){for(g=e-1;0<g;g--)h=l[g]+h,h.length>=this.B&&N(this,n,
h,M(q,d,r,e,g),a,c);h=""}case "forward":if(1<e){for(g=0;g<e;g++)h+=l[g],h.length>=this.B&&N(this,n,h,f,a,c);break}default:if(this.C&&(f=Math.min(f/this.C(b,l,r)|0,q-1)),N(this,n,l,f,a,c),w&&1<d&&r<d-1)for(e=x(),h=this.A,f=l,g=Math.min(w+1,d-r),e[f]=1,k=1;k<g;k++)if((l=b[this.F?d-1-r-k:r+k])&&l.length>=this.B&&!e[l]){e[l]=1;const p=this.l&&l>f;N(this,m,p?f:l,M(h+(d/2>h?0:1),d,r,g-1,k-1),a,c,p?l:f)}}}}this.m||(this.register[a]=1)}}return this};
function M(a,b,c,d,e){return c&&1<a?b+(d||0)<=a?c+(e||0):(a-1)/(b+(d||0))*(c+(e||0))+1|0:0}function N(a,b,c,d,e,f,h){let g=h?a.h:a.map;if(!b[c]||h&&!b[c][h])a.s&&(g=g[d]),h?(b=b[c]||(b[c]=x()),b[h]=1,g=g[h]||(g[h]=x())):b[c]=1,g=g[c]||(g[c]=[]),a.s||(g=g[d]||(g[d]=[])),f&&g.includes(e)||(g[g.length]=e,a.m&&(a=a.register[e]||(a.register[e]=[]),a[a.length]=g))}
t.search=function(a,b,c){c||(!b&&D(a)?(c=a,a=c.query):D(b)&&(c=b));let d=[],e;let f,h=0;if(c){a=c.query||a;b=c.limit;h=c.offset||0;var g=c.context;f=c.suggest}if(a&&(a=this.encode(""+a),e=a.length,1<e)){c=x();var k=[];for(let n=0,w=0,q;n<e;n++)if((q=a[n])&&q.length>=this.B&&!c[q])if(this.s||f||this.map[q])k[w++]=q,c[q]=1;else return d;a=k;e=a.length}if(!e)return d;b||(b=100);g=this.depth&&1<e&&!1!==g;c=0;let m;g?(m=a[0],c=1):1<e&&a.sort(aa);for(let n,w;c<e;c++){w=a[c];g?(n=ra(this,d,f,b,h,2===e,w,
m),f&&!1===n&&d.length||(m=w)):n=ra(this,d,f,b,h,1===e,w);if(n)return n;if(f&&c===e-1){k=d.length;if(!k){if(g){g=0;c=-1;continue}return d}if(1===k)return sa(d[0],b,h)}}return la(d,b,h,f)};
function ra(a,b,c,d,e,f,h,g){let k=[],m=g?a.h:a.map;a.s||(m=ta(m,h,g,a.l));if(m){let n=0;const w=Math.min(m.length,g?a.A:a.D);for(let q=0,r=0,l,p;q<w;q++)if(l=m[q])if(a.s&&(l=ta(l,h,g,a.l)),e&&l&&f&&(p=l.length,p<=e?(e-=p,l=null):(l=l.slice(e),e=0)),l&&(k[n++]=l,f&&(r+=l.length,r>=d)))break;if(n){if(f)return sa(k,d,0);b[b.length]=k;return}}return!c&&k}function sa(a,b,c){a=1===a.length?a[0]:[].concat.apply([],a);return c||a.length>b?a.slice(c,c+b):a}
function ta(a,b,c,d){c?(d=d&&b>c,a=(a=a[d?b:c])&&a[d?c:b]):a=a[b];return a}t.contain=function(a){return!!this.register[a]};t.update=function(a,b){return this.remove(a).add(a,b)};
t.remove=function(a,b){const c=this.register[a];if(c){if(this.m)for(let d=0,e;d<c.length;d++)e=c[d],e.splice(e.indexOf(a),1);else O(this.map,a,this.D,this.s),this.depth&&O(this.h,a,this.A,this.s);b||delete this.register[a];if(this.cache){b=this.cache;for(let d=0,e,f;d<b.h.length;d++)f=b.h[d],e=b.cache[f],e.includes(a)&&(b.h.splice(d--,1),delete b.cache[f])}}return this};
function O(a,b,c,d,e){let f=0;if(a.constructor===Array)if(e)b=a.indexOf(b),-1!==b?1<a.length&&(a.splice(b,1),f++):f++;else{e=Math.min(a.length,c);for(let h=0,g;h<e;h++)if(g=a[h])f=O(g,b,c,d,e),d||f||delete a[h]}else for(let h in a)(f=O(a[h],b,c,d,e))||delete a[h];return f}t.searchCache=na;
t.export=function(a,b,c,d,e,f){let h=!0;"undefined"===typeof f&&(h=new Promise(m=>{f=m}));let g,k;switch(e||(e=0)){case 0:g="reg";if(this.m){k=x();for(let m in this.register)k[m]=1}else k=this.register;break;case 1:g="cfg";k={doc:0,opt:this.s?1:0};break;case 2:g="map";k=this.map;break;case 3:g="ctx";k=this.h;break;default:"undefined"===typeof c&&f&&f();return}qa(a,b||this,c,g,d,e,k,f);return h};
t.import=function(a,b){if(b)switch(C(b)&&(b=JSON.parse(b)),a){case "cfg":this.s=!!b.opt;break;case "reg":this.m=!1;this.register=b;break;case "map":this.map=b;break;case "ctx":this.h=b}};ka(L.prototype);function ua(a){a=a.data;var b=self._index;const c=a.args;var d=a.task;switch(d){case "init":d=a.options||{};a=a.factory;b=d.encode;d.cache=!1;b&&0===b.indexOf("function")&&(d.encode=Function("return "+b)());a?(Function("return "+a)()(self),self._index=new self.FlexSearch.Index(d),delete self.FlexSearch):self._index=new L(d);break;default:a=a.id,b=b[d].apply(b,c),postMessage("search"===d?{id:a,msg:b}:{id:a})}};let va=0;function P(a){if(!(this instanceof P))return new P(a);var b;a?E(b=a.encode)&&(a.encode=b.toString()):a={};(b=(self||window)._factory)&&(b=b.toString());const c="undefined"===typeof window&&self.exports,d=this;this.o=wa(b,c,a.worker);this.h=x();if(this.o){if(c)this.o.on("message",function(e){d.h[e.id](e.msg);delete d.h[e.id]});else this.o.onmessage=function(e){e=e.data;d.h[e.id](e.msg);delete d.h[e.id]};this.o.postMessage({task:"init",factory:b,options:a})}}Q("add");Q("append");Q("search");
Q("update");Q("remove");function Q(a){P.prototype[a]=P.prototype[a+"Async"]=function(){const b=this,c=[].slice.call(arguments);var d=c[c.length-1];let e;E(d)&&(e=d,c.splice(c.length-1,1));d=new Promise(function(f){setTimeout(function(){b.h[++va]=f;b.o.postMessage({task:a,id:va,args:c})})});return e?(d.then(e),this):d}}
function wa(a,b,c){let d;try{d=b?new (require("worker_threads")["Worker"])(__dirname + "/node/node.js"):a?new Worker(URL.createObjectURL(new Blob(["onmessage="+ua.toString()],{type:"text/javascript"}))):new Worker(C(c)?c:"worker/worker.js",{type:"module"})}catch(e){}return d};function S(a){if(!(this instanceof S))return new S(a);var b=a.document||a.doc||a,c;this.K=[];this.h=[];this.A=[];this.register=x();this.key=(c=b.key||b.id)&&T(c,this.A)||"id";this.m=u(a.fastupdate);this.C=(c=b.store)&&!0!==c&&[];this.store=c&&x();this.I=(c=b.tag)&&T(c,this.A);this.l=c&&x();this.cache=(c=a.cache)&&new K(c);a.cache=!1;this.o=a.worker;this.async=!1;c=x();let d=b.index||b.field||b;C(d)&&(d=[d]);for(let e=0,f,h;e<d.length;e++)f=d[e],C(f)||(h=f,f=f.field),h=D(h)?Object.assign({},a,h):a,
this.o&&(c[f]=new P(h),c[f].o||(this.o=!1)),this.o||(c[f]=new L(h,this.register)),this.K[e]=T(f,this.A),this.h[e]=f;if(this.C)for(a=b.store,C(a)&&(a=[a]),b=0;b<a.length;b++)this.C[b]=T(a[b],this.A);this.index=c}function T(a,b){const c=a.split(":");let d=0;for(let e=0;e<c.length;e++)a=c[e],0<=a.indexOf("[]")&&(a=a.substring(0,a.length-2))&&(b[d]=!0),a&&(c[d++]=a);d<c.length&&(c.length=d);return 1<d?c:c[0]}function U(a,b){if(C(b))a=a[b];else for(let c=0;a&&c<b.length;c++)a=a[b[c]];return a}
function V(a,b,c,d,e){a=a[e];if(d===c.length-1)b[e]=a;else if(a)if(a.constructor===Array)for(b=b[e]=Array(a.length),e=0;e<a.length;e++)V(a,b,c,d,e);else b=b[e]||(b[e]=x()),e=c[++d],V(a,b,c,d,e)}function X(a,b,c,d,e,f,h,g){if(a=a[h])if(d===b.length-1){if(a.constructor===Array){if(c[d]){for(b=0;b<a.length;b++)e.add(f,a[b],!0,!0);return}a=a.join(" ")}e.add(f,a,g,!0)}else if(a.constructor===Array)for(h=0;h<a.length;h++)X(a,b,c,d,e,f,h,g);else h=b[++d],X(a,b,c,d,e,f,h,g)}t=S.prototype;
t.add=function(a,b,c){D(a)&&(b=a,a=U(b,this.key));if(b&&(a||0===a)){if(!c&&this.register[a])return this.update(a,b);for(let d=0,e,f;d<this.h.length;d++)f=this.h[d],e=this.K[d],C(e)&&(e=[e]),X(b,e,this.A,0,this.index[f],a,e[0],c);if(this.I){let d=U(b,this.I),e=x();C(d)&&(d=[d]);for(let f=0,h,g;f<d.length;f++)if(h=d[f],!e[h]&&(e[h]=1,g=this.l[h]||(this.l[h]=[]),!c||!g.includes(a)))if(g[g.length]=a,this.m){const k=this.register[a]||(this.register[a]=[]);k[k.length]=g}}if(this.store&&(!c||!this.store[a])){let d;
if(this.C){d=x();for(let e=0,f;e<this.C.length;e++)f=this.C[e],C(f)?d[f]=b[f]:V(b,d,f,0,f[0])}this.store[a]=d||b}}return this};t.append=function(a,b){return this.add(a,b,!0)};t.update=function(a,b){return this.remove(a).add(a,b)};
t.remove=function(a){D(a)&&(a=U(a,this.key));if(this.register[a]){for(var b=0;b<this.h.length&&(this.index[this.h[b]].remove(a,!this.o),!this.m);b++);if(this.I&&!this.m)for(let c in this.l){b=this.l[c];const d=b.indexOf(a);-1!==d&&(1<b.length?b.splice(d,1):delete this.l[c])}this.store&&delete this.store[a];delete this.register[a]}return this};
t.search=function(a,b,c,d){c||(!b&&D(a)?(c=a,a=""):D(b)&&(c=b,b=0));let e=[],f=[],h,g,k,m,n,w,q=0;if(c)if(c.constructor===Array)k=c,c=null;else{a=c.query||a;k=(h=c.pluck)||c.index||c.field;m=c.tag;g=this.store&&c.enrich;n="and"===c.bool;b=c.limit||b||100;w=c.offset||0;if(m&&(C(m)&&(m=[m]),!a)){for(let l=0,p;l<m.length;l++)if(p=xa.call(this,m[l],b,w,g))e[e.length]=p,q++;return q?e:[]}C(k)&&(k=[k])}k||(k=this.h);n=n&&(1<k.length||m&&1<m.length);const r=!d&&(this.o||this.async)&&[];for(let l=0,p,A,B;l<
k.length;l++){let z;A=k[l];C(A)||(z=A,A=z.field,a=z.query||a,b=z.limit||b,g=z.enrich||g);if(r)r[l]=this.index[A].searchAsync(a,b,z||c);else{d?p=d[l]:p=this.index[A].search(a,b,z||c);B=p&&p.length;if(m&&B){const y=[];let H=0;n&&(y[0]=[p]);for(let W=0,oa,R;W<m.length;W++)if(oa=m[W],B=(R=this.l[oa])&&R.length)H++,y[y.length]=n?[R]:R;H&&(p=n?la(y,b||100,w||0):ma(p,y),B=p.length)}if(B)f[q]=A,e[q++]=p;else if(n)return[]}}if(r){const l=this;return new Promise(function(p){Promise.all(r).then(function(A){p(l.search(a,
b,c,A))})})}if(!q)return[];if(h&&(!g||!this.store))return e[0];for(let l=0,p;l<f.length;l++){p=e[l];p.length&&g&&(p=ya.call(this,p));if(h)return p;e[l]={field:f[l],result:p}}return e};function xa(a,b,c,d){let e=this.l[a],f=e&&e.length-c;if(f&&0<f){if(f>b||c)e=e.slice(c,c+b);d&&(e=ya.call(this,e));return{tag:a,result:e}}}function ya(a){const b=Array(a.length);for(let c=0,d;c<a.length;c++)d=a[c],b[c]={id:d,doc:this.store[d]};return b}t.contain=function(a){return!!this.register[a]};t.get=function(a){return this.store[a]};
t.set=function(a,b){this.store[a]=b;return this};t.searchCache=na;t.export=function(a,b,c,d,e,f){let h;"undefined"===typeof f&&(h=new Promise(g=>{f=g}));e||(e=0);d||(d=0);if(d<this.h.length){const g=this.h[d],k=this.index[g];b=this;setTimeout(function(){k.export(a,b,e?g:"",d,e++,f)||(d++,e=1,b.export(a,b,g,d,e,f))})}else{let g,k;switch(e){case 1:g="tag";k=this.l;c=null;break;case 2:g="store";k=this.store;c=null;break;default:f();return}qa(a,this,c,g,d,e,k,f)}return h};
t.import=function(a,b){if(b)switch(C(b)&&(b=JSON.parse(b)),a){case "tag":this.l=b;break;case "reg":this.m=!1;this.register=b;for(let d=0,e;d<this.h.length;d++)e=this.index[this.h[d]],e.register=b,e.m=!1;break;case "store":this.store=b;break;default:a=a.split(".");const c=a[0];a=a[1];c&&a&&this.index[c].import(a,b)}};ka(S.prototype);var Aa={encode:za,F:!1,G:""};const Ba=[G("[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]"),"a",G("[\u00e8\u00e9\u00ea\u00eb]"),"e",G("[\u00ec\u00ed\u00ee\u00ef]"),"i",G("[\u00f2\u00f3\u00f4\u00f5\u00f6\u0151]"),"o",G("[\u00f9\u00fa\u00fb\u00fc\u0171]"),"u",G("[\u00fd\u0177\u00ff]"),"y",G("\u00f1"),"n",G("[\u00e7c]"),"k",G("\u00df"),"s",G(" & ")," and "];function za(a){var b=a=""+a;b.normalize&&(b=b.normalize("NFD").replace(da,""));return ba.call(this,b.toLowerCase(),!a.normalize&&Ba)};var Da={encode:Ca,F:!1,G:"strict"};const Ea=/[^a-z0-9]+/,Fa={b:"p",v:"f",w:"f",z:"s",x:"s","\u00df":"s",d:"t",n:"m",c:"k",g:"k",j:"k",q:"k",i:"e",y:"e",u:"o"};function Ca(a){a=za.call(this,a).join(" ");const b=[];if(a){const c=a.split(Ea),d=c.length;for(let e=0,f,h=0;e<d;e++)if((a=c[e])&&(!this.filter||!this.filter[a])){f=a[0];let g=Fa[f]||f,k=g;for(let m=1;m<a.length;m++){f=a[m];const n=Fa[f]||f;n&&n!==k&&(g+=n,k=n)}b[h++]=g}}return b};var Ha={encode:Ga,F:!1,G:""};const Ia=[G("ae"),"a",G("oe"),"o",G("sh"),"s",G("th"),"t",G("ph"),"f",G("pf"),"f",G("(?![aeo])h(?![aeo])"),"",G("(?!^[aeo])h(?!^[aeo])"),""];function Ga(a,b){a&&(a=Ca.call(this,a).join(" "),2<a.length&&(a=F(a,Ia)),b||(1<a.length&&(a=fa(a)),a&&(a=a.split(" "))));return a||[]};var Ka={encode:Ja,F:!1,G:""};const La=G("(?!\\b)[aeo]");function Ja(a){a&&(a=Ga.call(this,a,!0),1<a.length&&(a=a.replace(La,"")),1<a.length&&(a=fa(a)),a&&(a=a.split(" ")));return a||[]};I["latin:default"]=ia;I["latin:simple"]=Aa;I["latin:balance"]=Da;I["latin:advanced"]=Ha;I["latin:extra"]=Ka;const Y={Index:L,Document:S,Worker:P,registerCharset:function(a,b){I[a]=b},registerLanguage:function(a,b){ja[a]=b}};let Z;(Z=self.define)&&Z.amd?Z([],function(){return Y}):self.exports?self.exports=Y:self.FlexSearch=Y;}(this));

;
const search = document.querySelector('.search-input')
const suggestions = document.querySelector('.search-suggestions')
const background = document.querySelector('.search-background')

var index = new FlexSearch.Document({
  tokenize: "forward",
  cache: 100,
  document: {
    id: "id",
    tag: "tag",
    store: ["href", "title", "description"],
    index: ["title", "description", "content"]
  }
});

/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/
function initIndex() {
  // https://discourse.gohugo.io/t/range-length-or-last-element/3803/2
  // Note: pages without a title (such as browserconfig.xml) are excluded
  
  
  
  index.add(
    
      
      {
        id: 0,
        tag: "en",
        href: "/docs/about-this-site/",
        title: "About this site",
        description: "Information about this documentation site itself.",
        
        
        content: "About this site \u0026nbsp; We hope you like our new-look help docs which make use of richer formatting to make the articles easier to read, particularly those with code snippets or command-line instructions. We\u0026rsquo;ve also changed the way we manage the source content so it\u0026rsquo;s easier for us to maintain. There\u0026rsquo;s still more to do, to re-organise some of the content and add new pages to reflect how JASMIN is evolving. This site should redirect you from any previous URLs you may have stored, but please use the following features to help you navigate around the site:\nmain navigation bar along the top of the site, including search tool breadcrumbs menu, to show you where you are in the site collapsible sidebar, left side panel (docs pages only) icons, to identify articles within the same section table of contents, right side panel hover over sub-headings to reveal a bookmark-able link to that heading \u0026nbsp; tags to group together articles covering similar topics links between articles Issues with this site \u0026nbsp; If you spot any broken links or incorrect information, please let us know by opening an issue in the GitHub repository for this site\u0026rsquo;s source code:\nReport issues with this site \u0026nbsp; The date of update date and commit message for each page should be just above the footer of each page.\nOther issues \u0026nbsp; For all other reports of problems, or for any information you can\u0026rsquo;t find (don\u0026rsquo;t forget the other JASMIN sites linked in the footer!), please use the contact form via \u0026ldquo;Ask\u0026rdquo; in the JASMIN Help beacon (bottom right, orange button) and use the contact form to send a message to the helpdesk: this is the best method to get in touch. Note that the beacon no longer contains the links to the help docs themselves, but still provides the contact form. Hopefully the other navigation features described above should enable you to find what you need."
      })
      .add(
      
      
      {
        id: 1,
        tag: "en",
        href: "/docs/getting-started/storage/",
        title: "Access to storage",
        description: "This article provides an overview of JASMIN storage.",
        
        
        content: "IMPORTANT: Please see also Understanding new JASMIN storage which explains more about the different types of storage as of Phase 4 of JASMIN\u0026rsquo;s history.\nHome directory \u0026nbsp; Every JASMIN user is allocated a HOME directory located at /home/users/\u0026lt;username\u0026gt;. This directory is available across most of the interactive and batch computing resources, including the JASMIN login and transfer servers.\nIn the commands on this page, please replace \u0026lt;username\u0026gt; with your username, or use the environment variable $USER. For example, /home/users/\u0026lt;username\u0026gt; becomes /home/users/joebloggs. Each home directory has a default quota of 100 GB. Although you can\u0026rsquo;t directly check usage against your quota, you can find out the current size of your home directory as follows (the pdu command is a parallel variant of the du command, designed to work with the particular storage used for home directories on JASMIN).\npdu -sh /home/users/\u0026lt;username\u0026gt; # ^^^^^^^^^^ replace with your username \u0026nbsp; You are only allowed to exceed the 100 GB quota for a very brief period of time. If you continue to exceed the limit, you will be unable to add any more files, which means that jobs may fail, and other things may stop working for you. You will need to reduce your usage below the 100GB quota to resolve this. Backups of your home directory \u0026nbsp; Your home directory is backed up using a daily snapshot which provides a quick, self-service method for you to restore files or directories that have been accidentally deleted. Snapshot backups are kept for 1-2 weeks before being deleted.\nRecovering snapshots of your home directory data \u0026nbsp; Users can access snapshots to recover files/directories that have been accidentally deleted. These are stored in /home/users/.snapshot/homeusers.\u0026lt;snapshotid\u0026gt;/\u0026lt;username\u0026gt;\nThe most recent backup is the one with the highest snapshot id number.\nFind the ones relevant to your username with a command line this:\nls -ld /home/users/.snapshot/homeusers2.*/\u0026lt;username\u0026gt; # replace \u0026lt;username\u0026gt; with your own, as before There should be up to 14 directories like this:\ndrwx------ 113 joeblogs users 0 Jan 26 15:00 /home/users/.snapshot/homeusers2.2024_01_28_02_01/joebloggs drwx------ 113 joeblogs users 0 Jan 26 15:00 /home/users/.snapshot/homeusers2.2024_01_29_02_01/joebloggs drwx------ 113 joeblogs users 0 Jan 29 09:51 /home/users/.snapshot/homeusers2.2024_01_30_02_01/joebloggs drwx------ 113 joeblogs users 0 Jan 30 09:29 /home/users/.snapshot/homeusers2.2024_01_31_02_01/joebloggs drwx------ 113 joeblogs users 0 Jan 30 09:29 /home/users/.snapshot/homeusers2.2024_02_01_02_01/joebloggsEach of these snapshot directories effectively contains your home directory as it was on that date. You can copy files back from them (yourself) to their original location.\nls -l /home/users/.snapshot/homeusers2.45678/joebloggs/ total 1170964 -rw-r--r-- 1 joebloggs users 104857600 Jun 26 2017 100M.dat -rw-r--r-- 1 joebloggs users 1024000000 Feb 1 2017 1G.dat -rw-r--r-- 1 joebloggs users 0 Dec 18 12:09 6181791.err cp /home/users/.snapshot/homeusers2.45678/joebloggs/100M.dat ~/100M.dat A snapshot backup is also provided for /gws/smf volumes (similar allocations of SSD storage for GWS groups to share): snapshots in this case are made hourly and kept for 10 hours, then daily snapshots are kept for 2 weeks. These can be retrieved in a similar manner to that shown above. In this case the relevant directories should be found at\n/gws/smf/jNN/\u0026lt;gwsname\u0026gt;/.snapshot (where NN = 04 or 07 depending on where the volume is located)\n\u0026nbsp; All other group workspace volumes are not backed up. The only exception to this is the snapshot backups for smf SSD volumes just described. Please also note the advice on inter-volume symlinks, below: these are to be avoided.\nJASMIN disk mounts \u0026nbsp; There is a common file system layout that underpins most of the JASMIN infrastructure. However, access to different parts of the file system will depend on where you are logged in. Table 1 outlines the key disk mounts, where they are accessible from and the type of access (read and/or write).\nTable 1. List of common disk mounts, types of storage and their availability on JASMIN\nDisk mount\nlocation login sci transfer LOTUS Type Parallel-write /home/users R/W R/W R/W R/W SSD no /gws/pw/j07\n/gws/nopw/j04 (see note 1 below)\n/gws/smf/j0[4,7] no\nno\nno R/W\nR/W\nR/W R/W\nR/W\nR/W R/W\nR/W\nR/W PFS\nSOF\nSSD yes (hence \u0026ldquo;pw\u0026rdquo;)\nno (hence \u0026ldquo;nopw\u0026rdquo;)\nno /work/xfc/volX (see note 2 below) no\nno R/W R/W R/W PFS yes /work/scratch-pw[2,3]\n/work/scratch-nopw no\nno R/W\nR/W no\nno R/W\nR/W PFS\nSSD yes\nno /apps/contrib No RO No RO n/a n/a /badc, /neodc (archives) No RO RO RO n/a n/a login = login servers: login[1-4].jasmin.ac.uk\nsci = scientific analysis servers: sci[1-6,8].jasmin.ac.uk\ntransfer = data transfer servers: xfer[1-2].jasmin.ac.uk\nLOTUS = LOTUS batch processing cluster(all cluster nodes)\nDisks are mounted read/write (\u0026quot; R/W \u0026ldquo;) or read-only (\u0026rdquo; RO \u0026ldquo;).\nNote 1: Please refer to issues related to writing small files and NetCDF3 to SOF storage here\nNote 2: For details of how to use the Transfer Cache (XFC) service please see here\nWhere to write data \u0026nbsp; As indicated in table 1 there are three main disk mounts where data can be written. Please follow these general principles when deciding where to write your data:\nHOME directories (/home/users) are relatively small (100GB) and should NOT be used for storing large data volumes or for sharing data with other users. 0 Group Workspaces (mostly /gws/nopw/*/\u0026lt;project\u0026gt; but some /gws/pw/*/\u0026lt;project) are usually the correct place to write your data, although they are not backed up. Please refer to the Group Workspace documentation for details. /gws/pw/j07 volumes are parallel-write-capable storage from Phase 7 (onwards) of JASMIN /gws/nopw/j04 volumes are \u0026ldquo;Scale out Filesystem\u0026rdquo; (SOF) from Phase 4 (onwaards) of JASMIN: this storage is not parallel-write-capable The \u0026ldquo;scratch\u0026rdquo; areas (/work/scratch-pw2, /work/scratch-pw3 and /work/scratch-nopw) are available as a temporary file space for jobs running on LOTUS (see next section below). The (/tmp) directory is not usually an appropriate location to write your data (see next section below). How to use the temporary disk space \u0026nbsp; Scratch \u0026nbsp; The scratch areas /work/scratch-pw2, /work/scratch-pw3 and /work/scratch-nopw are a temporary file space shared across the entire LOTUS cluster and the scientific analysis servers.\nThese scratch areas are ideal for processes that generate intermediate data files that are consumed by other parts of the processing before being deleted. Please remember that these volumes are resources shared between all users, so consider other users and remember to clean up after your jobs. **** Any data that you wish to keep should be written to a Group Workspace (but remember to change the group-ownership of the data if you do).\nThere are 2 types of scratch storage available:\nPFS scratch (lots of it, fast, less good for small files) as 2 x 1 PB volumes /work/scratch-pw[2,3] and particularly suitable for users with a need for storage capabale of shared-file writes with MPI-IO, but good for most purposes. SSD scratch (less of it, very fast, good for small files) /work/scratch-nopw2 as 1 x 220 TB volume. Do not use for operations that attempt to write to multiple parts of a file simultaneously. Please be aware of this if your code (perhaps inadvertently?) writes to a shared log file. When using the \u0026ldquo;scratch\u0026rdquo; areas, please create a sub-directory (e.g. /work/scratch-????/\u0026lt;username\u0026gt;) labelled with your username and write your data there.\n/tmp \u0026nbsp; In contrast to the \u0026ldquo;scratch\u0026rdquo; space, /tmp directories on LOTUS nodes and physical sci machines are all local to the machine. These can be used to store small volumes of temporary data for a job that only needs to be read by the local process. But /tmp on virtual sci machines, are not local and therefore should not usually be used by users.\nCleaning up the scratch and tmp directories \u0026nbsp; Please make sure that your jobs delete any files under the /tmpand scratch directories when they are complete ( especially if jobs have not been completed normally!).\nPlease do this yourself so that you are not taken by surprise when automated deletion processes clear up any residual data:\n\u0026nbsp; Automated cleanup processes run daily and delete files that are older than 28 days from the last time of being accessed. This applies to /work/scratch-pw2, /work/scratch-pw3 and /work/scratch-nopw2\nPlease remember that shared temporary storage is for the use of all 2,000 users of JASMIN, not just you. If you persistently store large amounts (100s of TB) of data in scratch for long periods of tine, you deny use of that storage to other users (so expect action from the JASMIN team).\nPlease be a good JASMIN citizen!\nAny important data for keeping should be written to a group workspace or to your home directory if appropriate.**\nThe /work/scratch-pw[2,3] and /work/scratch-nopw areas are not available on the xfer, login or nx-login servers.\nAvoid inadvertently writing to /tmp \u0026nbsp; Sometimes software is configured by default to write to /tmp. Where possible, you should over-ride this and use your group workspace or a username-labelled directory within the scratch space instead.\nTo do this, please add the following lines (or similar) to your $HOME/.bashrc file:\nexport TMPDIR=/\u0026lt;path-to-your-GWS-or-scratch\u0026gt;/\u0026lt;your_username\u0026gt;/tmp # create the directory if needed [ -d $TMPDIR ] || mkdir -p $TMPDIR\u0026hellip;but please check that location regularly to clear it out!\nAccess to the CEDA archive \u0026nbsp; The CEDA Archive is mounted read-only under paths refleting the NERC data centres which merged to form CEDA, i.e.\n/badc (British Atmospheric Data Centre) /neodc (NERC Earth Observation Data Centre). (other data centre paths now also exist at that level: see CEDA Help docs\u0026nbsp; for more info)\nThe Archive includes a range of data sets that are provided under varying licences. Access to these groups is managed through standard Unix groups. Information about the data and their access restrictions is available from the CEDA Catalogue\u0026nbsp; .\n\u0026nbsp; As a JASMIN user, it is your responsibility to ensure that you have the correct permissions to access data any data in CEDA Archive from within JASMIN, even if file system permissions permit access. Tape access \u0026nbsp; Group workspace managers also have access to a tape library (Elastic Tape service) for making secondary copies and managing storage between online and near-line storage.\nNumber of files in a single directory \u0026nbsp; It is highly recommended that you do not exceed more than 100,000 files in a single directory on any type of storage on JASMIN. Large numbers of files place unnecessary load on components of the file system and can be the source of slow performance for you and other storage volumes in the system. To count the number of files, please note the advice in slow ls response below, or use an alternative command e.g. find.\nSlow \u0026rsquo;ls\u0026rsquo; response \u0026nbsp; This can be due to a number of reasons (see above advice regarding number of files in a single directory, and below regarding inter-volume symlinks). To speed up the response (useful if you want to count the number of files) it often helps to un-alias ls, e.g. by placing a backslash in front of the command: \\ls.\nAdvice on inter-volume symlinks in JASMIN storage \u0026nbsp; We highly recommend users not to use symbolic links in their home directories to other parts of the JASMIN file systems, such as GWSs or scratch areas. There are a number of conditions when the petabyte-scale JASMIN storage can become unusable for all users due to these links. There is a more technical explanation below. We would advise path substitutions using environment variables instead.\nSymlinks in users\u0026rsquo; home directories that point to other volumes (for example group workspaces) make matters worse when there are problems on the sci*.jasmin.ac.uk servers and other shared machines, and/or when the metadata servers responsible for particular storage volumes themselves become overloaded. The simplest advice we can currently give is to avoid using symlinks.\nIn more detail:\nThis issue is particularly apparent when ls is aliassed to ls --color (as is the default on 99% of JASMIN systems) AND one of the colorisation options specified is for an orphaned link. The ls on symlinks causes the metadata servers at the end of the symlink to be called (to provided the stat filesystem metadata), in addition to the metadata server for the home directory. If those metadata servers at the far end are under load, or have some other problem, the ls to the home directory can hang, but this also hangs other users who may be trying to ls their own home directory (even if theirs contains no symlinks). The situation can then escalate out of control as more and more users try and fail.\nThis is happens especially where one or more of the volumes involved contains large numbers of small files."
      })
      .add(
      
      
      {
        id: 2,
        tag: "en",
        href: "/docs/uncategorized/acknowledging-jasmin/",
        title: "Acknowledging  JASMIN",
        description: "Acknowledging  JASMIN",
        
        
        content: "We strongly encourage users to acknowledge JASMIN in all research outputs that have used the JASMIN facility. The acknowledgement statement should be:\n\u0026ldquo;This work used JASMIN, the UK\u0026rsquo;s collaborative data analysis environment (https://www.jasmin.ac.uk)\u0026rdquo;\ntogether with citation to this article:\nLawrence, B. N. , Bennett, V. L., Churchill, J., Juckes, M., Kershaw, P., Pascoe, S., Pepler, S., Pritchard, M. and Stephens, A. (2013) Storing and manipulating environmental big data with JASMIN. In: IEEE Big Data, October 6-9, 2013, San Francisco."
      })
      .add(
      
      
      {
        id: 3,
        tag: "en",
        href: "/docs/for-cloud-tenants/adding-and-removing-ssh-keys-from-an-external-cloud-vm/",
        title: "Adding and removing SSH keys from an External Cloud VM",
        description: "Adding and removing SSH keys from an External Cloud VM",
        
        
        content: "When you create a machine in a JASMIN External Cloud tenancy, the SSH key associated with your JASMIN account is uploaded to the machine to grant you access to the machine as root:\nssh -A root@\u0026lt;external ip\u0026gt; However, this is a one-time operation when the machine is created. Updating your SSH key in the JASMIN Accounts Portal is not reflected in External Cloud VMs. Once initial access has been granted, you as the tenancy admin are responsible for all configuration of the machine, including the SSH keys allowed to access the machine. For example, you may choose to grant access to a user who does not have a JASMIN account by adding their SSH key to the machine.\nIMPORTANT: When you change your SSH key in the JASMIN Accounts Portal, you must retain your old private key until you have added your new key to all External Cloud VMs that you administer. Failing to do so will result in you being locked out of those machines.\nAdding and removing SSH keys \u0026nbsp; The allowed SSH keys for a user can be found in $HOME/.ssh/authorized_keys for the user. For root, this is /root/.ssh/authorized_keys.\nTo grant access to a user, they must first generate an SSH key pair. Once they have done this, they should give you their public key. The private key should never leave the user\u0026rsquo;s local machine. Once you have added this public key as a new line to the authorized_keys file for the target user on your External Cloud VM, the user will be able to SSH to the machine.\nSimilarly, to disable access for a user, just remove their public key from the authorized_keys file on the machine.\nIMPORTANT: When replacing an old key with a new one, make sure that you add the new key before removing the old one or you may accidentally lock yourself out of your machine."
      })
      .add(
      
      
      {
        id: 4,
        tag: "en",
        href: "/docs/software-on-jasmin/additional-software/",
        title: "Additional software",
        description: "Additional software packages (under: /apps/jasmin/)",
        
        
        content: "This article provides details of additional packages that exist under the /apps/jasmin/ directory which is available on all scientific analysis servers and on the LOTUS batch cluster on JASMIN.\nThe /apps/jasmin/ directory has been provided as a home for additional software packages that are not installed within either Jaspy or \u0026ldquo;jasmin-sci\u0026rdquo; environments. This page details which packages are available along with details of how they are managed and accessed.\nCommunity packages under: /apps/jasmin/ \u0026nbsp; Software installed as community packages are provided, and maintained, by developers outside the CEDA/JASMIN Team. If you have queries about using community packages on JASMIN then please contact the JASMIN Helpdesk and we will forward them to the team that supports that specific package on JASMIN.\nESMValTool \u0026nbsp; The Earth System Model Evaluation Tool (ESMValTool) is a community diagnostics and performance metrics tool for the evaluation of Earth System Models (ESMs) that allows for routine comparison of single or multiple models, either against predecessor versions or against observations. See the ESMValTool on JASMIN page for more info."
      })
      .add(
      
      
      {
        id: 5,
        tag: "en",
        href: "/docs/short-term-project-storage/apply-for-access-to-a-gws/",
        title: "Apply for access to a GWS",
        description: "Apply for access to a GWS",
        
        
        content: "This article explains how to apply for access to a GWS from the JASMIN account portal.\nStep 1 : Sign in into your JASMIN accounts portal. Navigate to the JASMIN services tab of the portal then select the group workspaces from \u0026ldquo;Discover services\u0026rdquo; menu. You can search or browse a list of available GWSs. For example here the search for GWS with name containing CEDA, resulted in two GWSs.\nDiscover services Step 2: Select the GWS you are interested in and provide supporting information. In the following example, the GWS cedaproc was selected.\nSelect GWS Step 3: Your request to join a GWS is pending for approval\nRequest pending Step 4 : You will receive a notification of the outcome of your application. For example, the request to join an existing GWS cedaproc was granted and details of this service such as status and expiry date are displayed below\nOutcome notification Step 5: Every time a notification is acknowledged the counter is reset or decremented.\nNotification count Finally, you can view all the services that you currently have access to or have requested access for under \u0026lsquo;My Services\u0026rsquo;\nMy services"
      })
      .add(
      
      
      {
        id: 6,
        tag: "en",
        href: "/docs/uncategorized/approving-requests-for-access/",
        title: "Approving requests for access roles",
        description: "Approving requests for access roles",
        
        
        content: "Managers of JASMIN resources will also be set up to approve applications from members of the JASMIN user community wishing to use particular resources. The following video tutorial explains the approval process using the JASMIN Accounts Portal."
      })
      .add(
      
      
      {
        id: 7,
        tag: "en",
        href: "/docs/uncategorized/article-under-review/",
        title: "Article under review",
        description: "Article under review",
        
        
        content: "The article which you are trying to access has been removed, pending reorganisation of the JASMIN documentation and training materials.\nHopefully you can find what you\u0026rsquo;re looking for in other articles using the search tool or sidebar navigation."
      })
      .add(
      
      
      {
        id: 8,
        tag: "en",
        href: "/docs/data-transfer/bbcp/",
        title: "bbcp",
        description: "Data transfer tool bbcp",
        
        
        content: "This article provides information about the bbcp data transfer tool.\nWhat is bbcp? \u0026nbsp; bbcp is a simple command-line tool which can use your SSH connection to transfer data in and out of JASMIN efficiently. It works in a similar way to GridFTP over SSH in that it connects to the transfer server using your usual SSH credentials but then can set up parallel data streams for transferring data. One advantage of bbcp that it is provided as a single binary executable which is easy to download and use.\nUsing bbcp on JASMIN \u0026nbsp; Check with your local administrator to see if it is installed centrally on your own system. If it isn\u0026rsquo;t, you may need to download the correct binary from the bbcp download site and simply place it in your path on your local filesystem: this can be done as a regular/unprivileged user. At the JASMIN end, you can put the same executable in your home directory (somewhere in your $PATH e.g. in your ~/bin directory, and make sure you give the file execute permission). Once you have the bbcp command you can access any file which is readable by you when logged into JASMIN, or write to a Group Workspace that you have access to.\nConfiguring bbcp for JASMIN \u0026nbsp; When contacting hpxfer[12].jasmin.ac.uk you will need to set a couple of important options for it to work. The exact options depend on whether you are moving data into or out of JASMIN, and from where the transfer is initiated.\nThe bbcp protocol, in common with most high-bandwidth transfer tools, requires a set of ports to be open at one or both ends in order to establish data connections. Due to firewall restrictions this range of ports needs to be agreed in advance. In the case of hpxfer[12].jasmin.ac.uk the range of ports is 50000:51000. Therefore all bbcp commands must contain the option --port 50000:51000.\nAlso, hpxfer[12] will only allow incoming connections on these ports, therefore hpxfer[12] must be the server which listens for data connections. By default bbcp will listen for data connections at the end receiving data and connect from the end sending data. Therefore, with the default options, bbcp will succeed when pushing data to hpxfer[12] but fail when pulling data from it. In order to pull data, with the transfer initiated on the remote server, you must include the -z flag. Therefore the recommended commands for transferring in either direction are:\nInitiate on JASMIN: Pull Data from remote server \u0026nbsp; bbcp -v -4 -P 5 -F --port 50000:51000 username@remote-server:\u0026lt;PATH-TO-SOURCE-FILE\u0026gt; \u0026lt;PATH-TO-TARGET-FILE\u0026gt; Initiate on JASMIN: Push Data \u0026nbsp; bbcp -v -4 -P 5 --port 50000:51000 \u0026lt;PATH-TO-SOURCE-FILE\u0026gt; username@remote-server:\u0026lt;PATH-TO-TARGET-FILE\u0026gt; Initiate on remote server: Pull Data from JASMIN \u0026nbsp; bbcp -v -z -4 -P 5 --port 50000:51000 username@hpxfer1.jasmin.ac.uk:\u0026lt;PATH-TO-SOURCE-FILE\u0026gt; \u0026lt;PATH-TO-TARGET-FILE\u0026gt; Initiate on remote server: Push Data to JASMIN \u0026nbsp; bbcp -v -4 -P 5 -F --port 50000:51000 \u0026lt;PATH-TO-SOURCE-FILE\u0026gt; username@hpxfer1.jasmin.ac.uk:\u0026lt;PATH-TO-TARGET-FILE\u0026gt; In this case the -v flag produces verbose output .-V can be used for even more verbose output. The -4 option forces use of IP version 4 instead of IPv6 (essential for transfers to and from hpxfer1 or other JASMIN hosts. Note: this option may not be available in some older versions of bbcp), and the -P option reports the status of the transfer every n seconds. The default behaviour will print nothing. The -F option skips a check on the target host to check if there is enough disk space. This overcomes occasional problems where free space is not correctly reported to bbcp by the JASMIN file system.\nFor the full set of options, see: https://www.slac.stanford.edu/~abh/bbcp/\nNote: the bbcp command must be in your $PATH on both the source and target machine.\nInitiate on JASMIN: Pull Data from remote server, specifying SSH command to start bbcp \u0026nbsp; bbcp -v -4 -P 5 -F --port 50000:51000 -S \u0026#34;/usr/bin/ssh %I -l %U %H /path/to/bbcp\u0026#34; username@remote-server:\u0026lt;PATH-TO-SOURCE-FILE\u0026gt; \u0026lt;PATH-TO-TARGET-FILE\u0026gt; The path /path/to/bbcp can be replaced by module load bbcp; bbcp (or whatever is the appropriate local requirement) in environments where bbcp is a module which needs to be loaded first.\nbbcp -v -4 -P 5 -F --port 50000:51000 -S \u0026#34;/usr/bin/ssh %I -l %U %H module load bbcp; bbcp\u0026#34; username@remote-server:\u0026lt;PATH-TO-SOURCE-FILE\u0026gt; \u0026lt;PATH-TO-TARGET-FILE\u0026gt; For specifying the SSH command to start bbcp on the TARGET node, use the -T option.\nThe bbcp site has good documentation on further options, including the -r option for recursive transfers. A number of useful tutorials are also available elsewhere on the web.\nTuning Recommendations \u0026nbsp; We recommend you tune your connection by trying various different options on a few GBs of data.\nBy default 4 streams are opened. Try 1 stream first, particularly on fast connections, it may be faster. This is achieved with the option -s 1. We ask users of JASMIN to tune up to a maximum of 16 streams (-s 16). If you believe you need to open more streams please contact the JASMIN Helpdesk. Do not tune the window size unless you continue to get very poor bandwidth after adjusting the number of streams. Most modern operating systems will auto-tune this parameter. bbcp is not ideal for large directory trees of small files. If you have thousands of small files you may be better off with rsync or possibly GridFTP/Globus, depending on the network. Another simpler option is tarring/zipping the data first before transferring. Troubleshooting \u0026nbsp; bbcp uses SSH to establish the control connection so you need to set up your SSH key in the same way as you would to SSH into hpxfer[12].jasmin.ac.uk. If bbcp isn\u0026rsquo;t working you should first check you can SSH to hpxfer[12].jasmin.ac.uk. If you can\u0026rsquo;t, please review the steps in the Getting Started section before contacting the JASMIN Helpdesk. Make that you have logged in (via SSH) to both the JASMIN transfer server and the remote server with the -A option (agent-forwarding enabled), to ensure that your credentials are used by SSH as it invokes bbcp on the other server. Try adding the -Foption to disable bbcp\u0026rsquo;s filesystem checking if you get the following error: bbcp: Insufficient space to copy all the files from \u0026lt;hostname\u0026gt;. If you see the following error message: Address family not supported by protocol creating inet socketthis is most likely because the -4 flag was not specified. This may happen with commands that once worked, as a previously installed version of bbcp on JASMIN defaulted to IPv4. Currently there is no support for IPv6 on JASMIN. If the version of bbcp you have available on your system is old and does not have the -4 option, consider downloading the appropriate (newer) version from the link above. It is also possible to compile the executable from source."
      })
      .add(
      
      
      {
        id: 9,
        tag: "en",
        href: "/docs/getting-started/beginners-training-workshop/",
        title: "beginners training workshop - materials",
        description: "Beginners training workshop - materials",
        
        
        content: "The CEDA team regularly run hands-on interactive training workshops for users of JASMIN. The workshop makes use of exercises and tutorials to help users to become familiar with the JASMIN environment.\nThere are two types of workshop activities; exercises (ex) and tutorials (t). Exercises are interactive task-based activities based on different common scenarios of using JASMIN. Whereas tutorials provide in-depth explanations and demonstrations (but are not interactive). All workshop resources are freely available on GitHub and have supporting videos on YouTube.\nAnyone can complete the exercises in their own time with the resources linked, but joining an in-person workshop is a great chance for you to interact with the team, to discuss your research needs, and to provide feedback on the JASMIN service. Details about future workshops will be advertised on the CEDA events page - these are currently being run virtually due to the Covid-19 pandemic.\nMost of the exercises are stand-alone and do not necessarily need to be completed in order - however, if you are a new user, then we recommend you follow the exercises in order as it will help to explain the general workflows that you may encounter on JASMIN.\nNote: If you are using the materials individually (outside of an organised workshop event) then you will need to use your own JASMIN account and a group workspace which you already belong to, rather than the training accounts, and workshop group workspace, respectively. Instead of the workshop LOTUS queue, please use the test queue in this case.\nOverall aims of the workshop: \u0026nbsp; To engage novice to intermediate users in best practice for working on JASMIN via hands-on exercises To increase understanding about: which parts of JASMIN are suited for different tasks software available on JASMIN To provide a face-to-face environment where the JASMIN Team can offer support and feedback on a range of issues/problems To gather feedback on the gaps in current provision of documentation"
      })
      .add(
      
      
      {
        id: 10,
        tag: "en",
        href: "/docs/for-cloud-tenants/best-practice/",
        title: "Best practice",
        description: "Best practice",
        
        
        content: "External Cloud Tenancy additional notes\nBest practice guides for “server hardening” of Linux machines facing the internet:\nhttps://www.slideshare.net/myowntelco/centos-linux-server-hardening And particularly for web servers:\nhttps://www.slideshare.net/akashm/securing-a-linux-web-server-in-10-steps-or-less Additional notes regarding JASMIN External Cloud environment:\nThe Shield NAT/Firewall device is the only isolation between Tenant VMs and the raw internet. We monitor network traffic at the gateway/router but Security is the responsibility of the tenant. Please follow suggested security hardening guidelines for all VMs with connections to 192.171.139.0/25 Access to other JASMIN hosts and services from the external cloud, is the same as access from internet to these services. The default CentOS public catalog template is configured to use DNS, NTP and yum repo network services from the internet, not from the RAL site. SMTP (mail) server/relay configuration is the responsibility/choice of the tenant. We recommend tenants choose a hosted email server with virus and SPAM filtering and not attempt to configure their own email pipelines. Reverse DNS (IP to hostname) for 192.171.129.0/25 is managed by NERC DNS servers along with ( shortly ) default forward A name records. Tenants may setup forward A or CNAME DNS records (hostname to IP) for any domainnames they own/control via their own DNS or institutional name servers"
      })
      .add(
      
      
      {
        id: 11,
        tag: "en",
        href: "/docs/long-term-archive-storage/ceda-archive/",
        title: "CEDA Archive",
        description: "CEDA Archive",
        
        
        content: "This article describes accessing the CEDA Archive\u0026nbsp; from JASMIN:\nOverview \u0026nbsp; The CEDA Archive provides direct access to thousands of atmospheric, climate change and earth observation datasets. The Archive is directly accessible as a file system from the shared science machines on JASMIN.\nIt is a separate service run by the CEDA team - it is not a JASMIN service. Therefore, many of the links in this document will take you to the CEDA Archive help documentation site (as the information relates to CEDA Archive services). This is separate from the JASMIN help documentation site (which is specifically about JASMIN services).\nRegister for a CEDA Account \u0026nbsp; First, you need a CEDA Archive account. If you do not have a CEDA account, please follow the steps in this CEDA help document to register as a new CEDA user. It also explains how you can reset your password if you have forgotten it. When you have made a CEDA account, you will then need to use the CEDA portal to link it to your JASMIN account.\nThe JASMIN Account Portal deals with the management of access to JASMIN resources (e.g. compute and storage), whereas MyCEDA (the CEDA Accounts Portal) deals with access to CEDA resources (e.g. access to datasets in the archives). You will need both accounts linked in order to access CEDA Archive data from JASMIN - you can check whether your accounts are linked from within the CEDA Accounts Portal.\nAccessing the CEDA Archive on JASMIN servers \u0026nbsp; Once you have linked your CEDA and JASMIN accounts, you will have access to large parts of the archive straightaway.\nThe contents of the CEDA Archive are available on the file system under /badc and /neodc. Note: do not access data via any symlinks that point to /datacentre/archvol* - these are not permanent links and may change when data are migrated to new storage. Please use the archive path names under /badc and /neodc. Search the CEDA data catalogue for further details about data held in the archive.\nNote: /badc is for atmospheric \u0026amp; climate model data, /neodc is for earth observation data - they are named after CEDA\u0026rsquo;s previous archive names (British Atmospheric Data Centre, and the NERC Earth Observation Data Centre).\nMost data on the Archive is open access - however, some datasets are restricted. You can work this out by looking at the UNIX access groups the data are within (see below). If your required datasets are restricted, access to these can be obtained by applying for specific access via the data centre (see this article for more details). If direct access is not possible the data can be obtained via standard FTP and web-based access methods to the CEDA Archive and transferred to a suitable group workspace on JASMIN. As the data centres use the same JASMIN infrastructure the transfer rates are high.\nThe CEDA Data Catalogue is a useful tool to find and apply for access to datasets.\nArchive access groups \u0026nbsp; The UNIX access groups used within the CEDA Archive are listed below with links to example datasets in the CEDA data catalogue for those wishing to use them:\nopen Available to any logged in JASMIN user with a linked CEDA user account. See a full list of available datasets here. cmip5_research restricted CMIP3 and CMIP5 datasets esacat1 Satellite data including MERIS, MIPAS and SCIAMACHY. ecmwf Access to the ECMWF Operational Datasets. eurosat Satellite data including IASI, AVHRR-3 and GOME-2. ukmo_wx Met Office observational dataset collections including LIDARNET, MIDAS, MetDB and NIMROD ukmo_clim Climatology datasets from the Met Office, including Central England Temperature dataset collection, HadISST. byacl These data have specific restrictions on them meaning that they can\u0026rsquo;t be accessed directly from JASMIN, but can be obtained via FTP and web access. Data Licensing \u0026nbsp; All use of data accessed directly from the CEDA Archive must be used in line with the relevant data licence in place for the relevant dataset for the purposes stated in the access application. Data licence information can be found on the relevant CEDA Data Catalogue page, a link to which can be found in the 00README_catalogue_and_licence.txt files found in the archive. For specific data licences granted for restricted datasets, users should log into their MyCEDA page to view their granted licence and the associated usage purpose under which access was granted. Any required alternative use of the data beyond the original purpose stated in the original licence application can only be made with a freshly granted new licence application.\nAccessing data in the archive \u0026nbsp; In the example below, the logged-in user is listing the contents of the CRU data sets within the BADC archive. These are \u0026ldquo;open\u0026rdquo; so all logged-in users can access them:\nls -l /badc/cru/data total 320 -rw-r----- 1 badc open 396 Feb 18 2015 00README drwxr-x--- 8 badc open 4096 Mar 22 10:32 cru_cy drwxr-x--- 4 badc open 4096 Dec 6 2014 crutem drwxr-x--- 12 badc open 4096 May 9 14:11 cru_ts drwxr-x--- 3 badc open 4096 Feb 18 2015 PDSI The CEDA Archive Data Browser\u0026nbsp; is a good place to start as it gives a web-based view of the data with additional metadata but enables copying \u0026amp; pasting the directory path for use within the JASMIN environment:\nceda archive data browser"
      })
      .add(
      
      
      {
        id: 12,
        tag: "en",
        href: "/docs/interactive-computing/check-network-details/",
        title: "Check network details",
        description: "Check network details",
        
        
        content: "This article explains how to:\ncheck that your network domain is able to access JASMIN resources check that the particular host from which you are intending to connect to JASMIN has the required network configuration Check network domain (non .ac.uk users) \u0026nbsp; In order to maintain a secure and reliable scientific infrastructure for its users, JASMIN restricts login access by maintaining an \u0026ldquo;allow list\u0026rdquo; of network domains that are allowed to make SSH connections to the JASMIN login gateways and data transfer servers.\nAll .ac.uk network domains (i.e. UK universities and \u0026ldquo;academic\u0026rdquo; institutions) are already registered.\nIf your institution\u0026rsquo;s network domain is not .ac.uk, please request for it to be added to the allow list by contacting the JASMIN Helpdesk, after reading the information in the following section about forward and reverse DNS lookup.\nCheck IP address resolves to network domain (all users) \u0026nbsp; In addition to being on the allowed IP list there is an additional requirement that the address of your local computer must have forward and reverse DNS lookup enabled. This means that the hostname must resolve to an IP address, and the IP address must resolve to the fully-qualified hostname.\nOne easy way to do this is to access the following URL from the machine which will be used to make the SSH connection to JASMIN :\nhttps://accounts.jasmin.ac.uk/services/reverse_dns_check/\nIf you don\u0026rsquo;t have a web browser on that machine, you can use the \u0026lsquo;curl\u0026rsquo; or \u0026lsquo;wget\u0026rsquo; Linux commands to make an HTTP request to that URL, and inspect the output. A successful response will look like this:\nExternal IP address: 130.246.123.456 Resolved to host: vpn-3-167.rl.ac.ukWhereas an unsuccessful response will look like this:\nExternal IP address: 130.246.123.456 Reverse DNS lookup failedIf your IP address does not resolve, please contact your local IT technical support desk and show them this article to help explain the context.\nIt is important that the network domain to which the IP address resolves is part of the network domain which has been allowed. If there is no obvious relationship between the network domain of the host and that of your institution (derived from your email address), you may be asked to provide additional justification or your connection may be denied. Some institutions prefer not to provide public DNS listings: in this case please ask the technical support representative to contact the JASMIN helpdesk on your behalf to see if a technical solution can be found.\nThis can be a problem if you attempt to connect directly from a commercial home or business internet service provider. Wherever possible, please connect to your institution (which is likely to be on the allow list already) before making an outgoing SSH connection to a JASMIN server.\nAs long as the IP address resolves to a fully-qualified hostname within the allowed domain, it does not matter whether the host has a static or dynamically-assigned (DHCP) IP address.\nIf you cannot obtain an IP address that resolves in this way, you may still be able to access (only) login2.jasmin.ac.uk, which has been configured to enable access without the reverse DNS restriction. However, this is likely to be the only entry point available to you and will limit what you can do on JASMIN. Doing so can be useful as a temporary solution, but to gain full use of JASMIN you will need to have an IP address that resolves to the domain of your institution. For access to graphical desktops, equivalent servers nx- login2.jasmin.ac.uk and nx-login3.jasmin.ac.uk have been provided and for transfer tasks, an additional transfer server xfer3.jasmin.ac.uk is available. See login servers and transfer servers, but note the additional access role required in the case of the transfer server."
      })
      .add(
      
      
      {
        id: 13,
        tag: "en",
        href: "/docs/for-cloud-tenants/cluster-as-a-service/",
        title: "Cluster-as-a-Service",
        description: "Cluster-as-a-Service",
        
        
        content: "Introduction \u0026nbsp; JASMIN Cluster-as-a-Service (CaaS) is a service on the JASMIN Cloud that aims to make it easy to provision and maintain clusters of various types by providing a simple, intuitive interface via the JASMIN Cloud Portal.\nCaaS is only available in the External Cloud, and machines provisioned by the CaaS system are subject to the usual constraints:\nRoot access \u0026nbsp; The provisioning user gets root access to the hosts. Clusters can be customised, for example to add new packages. But be careful not to break the configuration of the clustering software! Note: If a tenants makes a change which breaks the cluster patching, the cluster will have to be rebuilt. Patching \u0026nbsp; Users are responsible for applying patches. However, patching a cluster is a simple task triggered in the JASMIN Cloud Portal. Cluster admins to decide when to trigger a patch. Access to CEDA archive and JASMIN Group Workspaces \u0026nbsp; No POSIX access to the CEDA archive or JASMIN Group Workspaces. Read-only access via HTTP/OPeNDAP is possible. Read-write access to the JASMIN Object Store is also possible. The CaaS system has cluster types that provide shared storage between clusters. User management \u0026nbsp; Tenancies must manage their own users/groups. Users of services in a tenancy do not need a JASMIN account. However a JASMIN account is required to use the JASMIN Cloud Portal. Encourages a structure where admins provision and maintain clusters on behalf of their users. The CaaS system has an Identity Manager which provides identity services for a tenancy, i.e. users have a single identity across all clusters within in a single tenancy. However this identity is not linked to a JASMIN account. Available cluster types \u0026nbsp; Cluster type Details Identity Manager Manages identity and permissions for other clusters using a combination of FreeIPA and Keycloak. NFS Shared storage for other clusters using a simple NFS server. Kubernetes A Kubernetes cluster deployed using Rancher Kubernetes Engine. Pangeo The Pangeo stack deployed on Kubernetes. Slurm (currently disabled) A batch cluster running the Slurm workload manager. Creating a cluster \u0026nbsp; Clusters are created via the JASMIN Cloud Portal using a new Clusters tab alongside Overview , Machines , and Volumes. If you do not see this tab, then clusters are not enabled for your tenancy.\nSelect clusters tab if available Click on the tab and you will see a list of your existing clusters. To create a new cluster, click on the New cluster button - this will launch a dialogue where you can select a cluster type:\nSelect a cluster type Clicking on a cluster type will show a form collecting parameters for the cluster, which will be different for each cluster type (the options for each cluster type are discussed in more detail in other articles):\nSpecify parameters for new cluster Click Create cluster to start the cluster creation. The cluster may take several minutes to configure (especially as the initial configuration includes a full patch of operating system packages):\nCreate the cluster Once configuration is complete, the cluster status will become READY. The cluster is then ready to use:\nCluster in READY status More details of how to use each cluster type are given in other help articles on this site, linked in the table of available cluster types above.\nVisit the Machines tab to see the machines that were created as part of the cluster:\nList machines created as part of the cluster Updating a cluster \u0026nbsp; Some cluster options, such the number of workers in a Kubernetes cluster, can be updated after a cluster has been created. To do this, select Update cluster options from the Actions\u0026hellip; dropdown for the cluster:\nSelect update cluster options This will launch a dialogue similar to the one for creating a cluster, except some of the options will be greyed out as they cannot be changed:\nNext dialogue After updating the options, click Update cluster to re-configure the cluster. As with cluster creation the cluster status will change to CONFIGURING , becoming READY once the re-configuration is complete. Where possible, the CaaS system makes an effort to re-configure the cluster with as little downtime as possible.\nPatching a cluster \u0026nbsp; \u0026ldquo;Patching\u0026rdquo; refers to the specific operation of updating the operating system packages on a machine. It is expected that tenants in the External Cloud will ensure that their machines are regularly patched as a security measure, as package updates often contain fixes for known vulnerabilities that can be exploited if left unpatched.\nThe CaaS system makes patching clusters easy - just select Patch cluster from the Actions\u0026hellip; dropdown for the cluster and confirm the operation in the dialogue that appears:\nSelect patch cluster Patch cluster - confirmation As with creating and updating, the cluster status will first become CONFIGURING , becoming READY once the patching is complete. Where possible, the CaaS system will patch the cluster with as little downtime as possible.\nClusters that have not been patched recently will be flagged in the Cloud Portal:\nUnpatched clusters Deleting a cluster \u0026nbsp; To delete a cluster, just select Delete from the Actions\u0026hellip; dropdown for the cluster and confirm the operation in the dialogue that appears:\nSelect delete cluster Delete confirmation The cluster status will become DELETING :\nDeleting This will delete the machines associated with the cluster. Once the machines have been deleted, the cluster will be removed. A deleted cluster cannot be restored."
      })
      .add(
      
      
      {
        id: 14,
        tag: "en",
        href: "/docs/for-cloud-tenants/cluster-as-a-service-identity-manager/",
        title: "Cluster-as-a-Service - Identity Manager",
        description: "Cluster-as-a-Service - Identity Manager",
        
        
        content: "This article describes how to deploy and use the JASMIN Cluster-as-a-Service (CaaS) Identity Manager.\nIntroduction \u0026nbsp; The Identity Manager consists of a FreeIPA server, a Keycloak server and a gateway/proxy server that work together to provide a single identity across all cluster types, whether via a web-browser, SSH or custom CLI tools like kubectl.\nFreeIPA is an open-source identity management system specifically designed to manage Linux hosts and the user accounts on those hosts. To do this, It integrates LDAP, Kerberos, NTP, DNS and a certificate authority into a single unit that is easy to install and configure.\nKeycloak is an open-source product that provides single sign-on (SSO) using OpenID Connect and SAML, primarily aimed at web-based services.\nFreeIPA and Keycloak are powerful systems, and a full discussion of their capabilities is beyond the scope of this article. This article focuses on their use within the CaaS system, and will be sufficient for the vast majority of users. Any usage that deviates from that described in the JASMIN CaaS documentation is not explicitly supported, should something go wrong.\nAll hosts deployed using CaaS are registered with the FreeIPA instance for your tenancy, and FreeIPA provides DNS, user/group management and access control policies for those hosts. FreeIPA is also the single source of truth for users and groups on your clusters. It is not possible to link with other accounts, including JASMIN accounts. Keycloak is used to provide OpenID Connect support for web applications, and for Kubernetes authentication. Although Keycloak can manage its own users and groups, in the Identity Manager setup it consumes the users and groups from FreeIPA via the LDAP integration in order to provide a single user account across all clusters.\nThe web interfaces for FreeIPA and Keycloak are exposed through a single gateway/proxy host. This host is also configured to allow SSH access for all active users, which means it can be used with SSH agent forwarding as a jump host for SSH access to clusters without an external IP (similar to the way that the MISSING LINK work.)\nThe Identity Manager does not have self-service user registration or password reset - these operations must be performed by an admin on behalf of the user.\nCluster configuration \u0026nbsp; The following variables are available when creating an Identity Manager:\nVariable Description Required? Can be updated? External IP The external IP that will be attached to the gateway host. This is the the IP that can be used as a jump host for SSH access. Yes No Admin password The password for the admin account. When the Identity Manager is created, this is the only user that exists. Please make sure you choose a secure password. WARNING: This password cannot be changed. Changing the admin password in the FreeIPA web interface will break cluster configuration for all clusters. Yes No Admin IP ranges One or more IP ranges from which admins will access the FreeIPA and Keycloak web interfaces, in CIDR notation. Any attempt to access the admin interfaces froman IP address that is not in these ranges will be blocked. FreeIPA and Keycloak allow the creation and modification of users and permissions for all your clusters, so it is recommended that this range be as small as possible. If you are not sure what value to use here, contact your local network administrator to find out the appropriate value for your network. Yes Yes FreeIPA size The machine size to use for the FreeIPA server. Yes No Keycloak size The machine size to use for the Keycloak server. Yes No Gateway size The machine size to use for the gateway server. Yes No Gateway domain The domain to use for the gateway server.\nIf left empty, \u0026lt;dashed-gateway-ip\u0026gt;.sslip.io is used (this uses the sslip.io service). For example, if the selected gateway IP is 192.171.139.83, the domain will be 192-171-139-83.sslip.io.\nIf given, the domain must already be configured to point to the External IP , otherwise configuration will fail. Only use this option if you have control over your own DNS entries - the CaaS system will not create a DNS entry for you. No No Once configuration is complete, the FreeIPA web interface will be available at https://\u0026lt;gateway domain\u0026gt;. You should be able to authenticate with the username admin and the password that was given at deployment time:\nFreeIPA web interface The Keycloak web interface is available at https://\u0026lt;gateway domain\u0026gt;/auth/. You should be able to authenticate with the same username and password as FreeIPA.\nKeycloak web interface Managing users \u0026nbsp; The users of your clusters are not related in any way to JASMIN users - in fact, there is no requirement that the users of your clusters have a JASMIN account. The pattern we encourage is that one or more admins with JASMIN accounts and access to the JASMIN Cloud Portal deploy and maintain clusters on behalf of their users. Those admins can then create user accounts and grant access to clusters for their own users without those users even needing to be aware of JASMIN.\nCreating a user \u0026nbsp; To add a new user, first log in to the FreeIPA interface. Do not add users via the Keycloak interface. You will be taken to the users panel, where you click the Add button:\nFreeIPA interface: adding a new user This will pop up a dialogue for you to populate some basic information about the user. The User login , First name , Last name and New/Verify password fields are the ones that need to be populated. Pick a strong password for the user - they can change this later via the FreeIPA interface if they wish:\nUser information dialogue Click Add to create the user. You must then securely distribute this password to the user - if possible, write it down and give it to them in person, otherwise use an encrypted email.\nThe first time they log in, they will be asked to set a new password. Make sure they do this as soon as possible:\nUpdate password dialogue The newly added user cannot do anything except view the users and modify some of their own information. They can see, but not edit, their group memberships.\nView of user info Adding an SSH public key \u0026nbsp; Adding an SSH public key can be done either by the user themselves or by an admin. First, navigate to the details page for the user. In the Account Settings section, there is an item called SSH public keys. Click the Add button next to it:\nAdding an SSH key (1) This will open a dialogue where the SSH public key can be entered:\nAdding an SSH key (2) After clicking Set , the user interface will show New: key set under the SSH public keys item. However, the key is not preserved until the user is saved by clicking the Save button:\nAdding an SSH key (3) Once saved, the content of the SSH public keys item will change to a fingerprint, which means the key was saved correctly. The key can be updated or deleted at any point in the future if the associated private key is compromised or lost:\nChanging a user\u0026rsquo;s password \u0026nbsp; FreeIPA has no facility for self-service password reset, however users can change their own password or an admin can reset it on their behalf. The procedure is the same in both cases, except that when changing their own password the user is required to provide their current password as well as the new one.\nTo change a user\u0026rsquo;s password, first navigate to the user details page then select Reset password from the Actions dropdown:\nReset password (1)) This will open a dialogue where a new password can be entered. An admin changing the password on behalf of another user will only see the New/Verify Password fields:\nReset password (2) A user resetting their own password will also see Current Password and OTP fields. The current password must be provided. OTP can be ignored.\nUser resetting own password After clicking Reset Password , the password is changed.\nIf a user\u0026rsquo;s password is reset by an admin, the user will be asked to change their password the first time they log in, like when a new user is created.\nDeleting a user \u0026nbsp; To delete a user, navigate to the Identity \u0026gt; Users \u0026gt; Active users page. On this page, check the box next the user you want to disable, then click the Delete button:\nDeleting a user (1) In the confirmation dialogue that pops up, make sure to select preserve as the Delete mode - it is not recommended to permanently delete users:\nDeleting a user (2) Upon clicking the Delete button, the user will be moved to the Preserved users section:\nDeleting a user (3) They will no longer show up as a user on any CaaS hosts or in Keycloak. They can be easily restored by selecting the user and clicking the Restore button.\nManaging groups \u0026nbsp; When you deploy a cluster through CaaS, it may create one or more access control groups in FreeIPA as part of its configuration. Some clusters can also consume additional groups created in FreeIPA. This is discussed in more detail in the documentation for each cluster type, but the way you manage group membership is the same in all cases.\nCreating a new group \u0026nbsp; To create a new group, navigate to the Identity \u0026gt; Groups \u0026gt; User groups section and click the Add button:\nCreating a new group (1) In the resulting dialogue, set the Group name and, if you wish, a Description (recommended!). The Group Type can be left as POSIX , even if the group is only to be used for OpenID Connect. By leaving GID empty, a free GID will be allocated:\nCreating a new group (2) After clicking the Add button, the new group will be available for adding users.\nAdding and removing users \u0026nbsp; First, navigate to the Identity \u0026gt; Groups \u0026gt; User groups section:\nAdding/removing users (1) Click on the group that you want to add/remove users for to get to the details page for that group. To add users, click the Add button:\nAdding/removing users (2) In the dialogue that pops up, select the users you want to add and click the \u0026gt; button to move them from Available to Prospective :\nAdding/removing users (3) Adding/removing users (4) Click Add to add the users to the group.\nTo remove users from a group, select them in the user list for the group and click Delete :\nAdding/removing users (5) Upon confirmation, the users will be removed from the group.\nThe admins group \u0026nbsp; There is one special group that is created in FreeIPA by default, called admins. This group is respected by all cluster types and members are granted permissions across all clusters deployed using CaaS, including (but not limited to):\nFull admin access to the FreeIPA and Keycloak web interfaces SSH access to all hosts deployed using CaaS cluster-admin access to all Kubernetes clusters Access to all Pangeo clusters Managing OpenID Connect clients \u0026nbsp; For an application to use OpenID Connect to authenticate users, it must first be registered as a client with Keycloak. Clients are issued with an ID and secret so that Keycloak knows which application is making an authorisation request.\nTo manage your OpenID Connect clients, go to Keycloak at https://\u0026lt;gateway domain\u0026gt;/auth/ and click Administration Console. Upon signing in with valid admin credentials (see The admins group above) you will be redirected to the Keycloak admin console. Click on Clients in the menu to see the list of clients:\nKeycloak admin console Keycloak itself uses OpenID Connect to handle authentication for its web and command-line interfaces, so there are several clients related to Keycloak operations. CaaS will also automatically create new OpenID Connect clients for clusters that need them - most notably Kubernetes clusters - in which case the client will be named after the cluster. The client with Client ID kubernetes in the list above is an example of a client created by CaaS.\nIn order to configure an OpenID Connect client to talk to Keycloak, you also need the client secret. To find out the secret for a client, click on the client and then click on the Credentials tab:\nKeycloak: credentials tab The client secret is then shown in a disabled text box, where it can be copied from:\nKeycloak: client secret"
      })
      .add(
      
      
      {
        id: 15,
        tag: "en",
        href: "/docs/for-cloud-tenants/cluster-as-a-service-kubernetes/",
        title: "Cluster-as-a-service - Kubernetes",
        description: "Cluster-as-a-service - Kubernetes",
        
        
        content: "This article describes how to deploy and use a Kubernetes cluster using JASMIN Cluster-as-a-Service (CaaS).\nIntroduction \u0026nbsp; Kubernetes is an open-source system for automating the deployment, scaling and management of containerised applications.\nKubernetes is an extremely powerful system, and a full discussion of its capabilities is beyond the scope of this article - please refer to the Kubernetes documentation. This article assumes some knowledge of Kubernetes terminology and focuses on things that are specific to the way Kubernetes is deployed by CaaS.\nIn CaaS, Kubernetes is deployed in a single-master configuration using Rancher Kubernetes Engine (RKE). This configuration was chosen so that a single external IP can be used for SSH access to the cluster and for ingress - external IPs are a scarce resource in the JASMIN Cloud and the number available to each tenancy is limited. It is for this reason that load-balancer services are also not available. Highly-available (HA) configurations may be available in the future.\nAll externally-exposed services, including the Kubernetes API, are authenticated using the Identity Manager, meaning that FreeIPA groups can be used to control access to the cluster.\nThe following services are also configured by CaaS (described in more detail later):\nThe Nginx Ingress Controller The Openstack Cloud Provider (Block Storage and Metadata only) Jetstack\u0026rsquo;s cert-manager The Kubernetes dashboard Cluster configuration \u0026nbsp; The following variables are available when creating a Kubernetes cluster:\nVariable Description Required? Can be updated? Identity manager The CaaS Identity Manager that is used to control access to the cluster. Yes No Version The Kubernetes version to use. The available versions are determined by the RKE version used by the CaaS configuration. This can be changed after initial deployment to upgrade a cluster to a newer Kubernetes version. Before doing this, you should back up your cluster - in particular, you should take a snapshot of the etcd database and make sure any data in persistent volumes is backed up. Yes Yes Worker nodes The number of worker nodes in the cluster. This can be scaled up or down after deployment. When scaling down, there is currently no effort made to drain the hosts in order to remove them gracefully: we rely on Kubernetes to reschedule terminated pods. This may change in the future. Yes Yes Master size The size to use for the master node. The master node is configured to be unschedulable, so no user workloads will run on it (just system workloads). Yes No Worker size The size to use for worker nodes. Consider the workloads that you want to run and pick the size accordingly. The capacity of the cluster can be increased by adding more workers, but the size of each worker cannot be changed after the first deployment. Yes No Root volume size The size of the root volume of cluster nodes, in GB. This volume must be sufficiently large to hold the operating system (~3GB), all the Docker images used by your containers (which can be multiple GBs in size) and all the logs and ephemeral storage for your containers. For reference, Google Kubernetes Engine (GKE) deploys hosts with 100GB root disks by default. At least 40GB is recommended. Yes No External IP The external IP that will be attached to the master node. This IP is where the Kubernetes API will be exposed, and can be used for SSH access to the nodes. Yes No Admin IP ranges One or more IP ranges from which admins will access the Kubernetes API and dashboard (if enabled), in CIDR notation. Any attempt to access the API or dashboard from an IP address that is not in these ranges will be blocked. Access to the Kubernetes API may allow the creation of resources in your cluster, so it is recommended that this range be as small as possible. If you are not sure what value to use here, contact your local network administrator to find out the appropriate value for your network. Yes Yes Kubernetes dashboard Indicates whether to deploy the Kubernetes dashboard. If selected, the Kubernetes dashboard will be available at the configured domain (see below). Yes Yes Dashboard domain The domain to use for the Kubernetes dashboard. If left empty, dashboard.\u0026lt;dashed-external-ip\u0026gt;.sslip.io is used. For example, if the selected external IP is 192.171.139.83, the domain will be dashboard.192-171-139-83.sslip.io. If given, the domain must already be configured to point to the selected External IP , otherwise configuration will fail. Only use this option if you have control over your own DNS entries - the CaaS system or Kubernetes will not create a DNS entry for you. No No Accessing the cluster \u0026nbsp; Kubernetes is configured to use the OpenID Connect support of the Identity Manager for authentication and authorisation. This means that all interactions with the cluster are authenticated and authorised against the users in FreeIPA, via the Keycloak integration.\nUsing the dashboard \u0026nbsp; If the option to deploy the dashboard was selected, the Kubernetes dashboard will be available at https://\u0026lt;dashboard domain\u0026gt;. Upon visiting the dashboard, you will be redirected to Keycloak to sign in:\nKeycloak sign-in screen Any user that exists in your FreeIPA database is able to log in to the dashboard, but only those with permissions assigned for the cluster will be able to see or do anything. Here is an example of what a user with no permissions will see:\nView for user with no permissions And here is an example of what a user with full admin rights will see (see Using Kubernetes RBAC below):\nView for user with full admin rights Using kubectl \u0026nbsp; This section assumes that you have kubectl, the Kubernetes command-line client, installed on your workstation. In order to authenticate with Keycloak, you must also install the kubelogin plugin, which provides OpenID Connect authentication for kubectl.\nIn order to configure OpenID Connect, you need to know the client ID and secret of the OpenID Connect client for your Kubernetes cluster in Keycloak. If you are an admin, you can find this information in the Keycloak admin console - the client will be named after the cluster. If you are not an admin, your admin should provide you with this information.\nUse the following commands to configure kubectl to connect to your Kubernetes cluster using your Identity Manager, replacing the variables with the correct values for your clusters:\n# Put the configuration in its own file export KUBECONFIG=./kubeconfig # Configure the cluster information kubectl config set-cluster kubernetes \\ --server https://$KUBERNETES_EXTERNAL_IP:6443 \\ --insecure-skip-tls-verify=true Cluster \u0026#34;kubernetes\u0026#34; set. # Configure the OpenID Connect authentication kubectl config set-credentials oidc \\ --auth-provider=oidc \\ --auth-provider-arg=idp-issuer-url=https://$ID_GATEWAY_DOMAIN/auth/realms/master \\ --auth-provider-arg=client-id=$CLIENT_ID \\ --auth-provider-arg=client-secret=$CLIENT_SECRET User \u0026#34;oidc\u0026#34; set. # Configure the context and set it to be the current context kubectl config set-context oidc@kubernetes --cluster kubernetes --user oidc Context \u0026#34;oidc@kubernetes\u0026#34; created. kubectl config use-context oidc@kubernetes Switched to context \u0026#34;oidc@kubernetes\u0026#34;. Once kubectl is configured, use the oidc-login plugin to authenticate with Keycloak and obtain an ID token. Running this command launches a temporary lightweight web server on your workstation that performs the authentication flow with Keycloak. A browser window will open where you enter your username and password:\nkubectl oidc-login Open http://localhost:8000 for authentication You got a valid token until 2019-07-11 21:58:06 +0100 BST Updated ./kubeconfig You can now use kubectl to query the Kubernetes resources to which you have been granted access:\nkubectl get nodes NAME STATUS ROLES AGE VERSION kubernetes-master-0 Ready controlplane,etcd 12h v1.13.5 kubernetes-worker-0 Ready worker 12h v1.13.5 kubernetes-worker-1 Ready worker 12h v1.13.5 kubernetes-worker-2 Ready worker 12h v1.13.5 Using Kubernetes RBAC \u0026nbsp; Kubernetes includes a powerful Role-Based Access Control (RBAC) system. A full discussion of the RBAC system is beyond the scope of this documentation, but this section gives some examples of how RBAC in Kubernetes can be used in combination with FreeIPA groups to allow fine-grained access to the cluster.\nFor every Kubernetes cluster that is deployed, CaaS automatically creates a group in FreeIPA called \u0026lt;clustername\u0026gt;_users. This group, along with the admins group, are assigned the cluster-admin role using a ClusterRoleBinding, which grants super-user access to the entire cluster. In order to grant a user super-user access to the cluster, they just need to be added to one of these groups (depending on whether you want them to be a super-user on other clusters as well).\nIt is also possible to create additional groups in FreeIPA and attach more restrictive permissions to them.\nExample 1: Read-only cluster access \u0026nbsp; For example, suppose you have some auditors who require read-only access to the entire cluster in order to know what workloads are running. The first thing to do is create a group in FreeIPA - in this case, you might create a group called kubernetes_auditors. Once the group is created, you can reference it in Kubernetes by using the prefix oidc: - in this case the group would be referenced in Kubernetes as oidc:kubernetes_auditors. To grant read-only access to this group for the entire cluster, create a ClusterRoleBinding linking that group to the built-in view role:\napiVersion: rbac.authorization.k8s.io/v1 kind: ClusterRoleBinding metadata: name: kubernetes-auditors-read roleRef: apiGroup: rbac.authorization.k8s.io kind: ClusterRole name: view subjects: - apiGroup: rbac.authorization.k8s.io kind: Group name: oidc:kubernetes_auditors Example 2: Read-write namespace access \u0026nbsp; As another example, suppose you have some developers who want to deploy their app in your cluster, and you want to grant them read-write access to a single namespace to do this. Again, the first thing you would do is create a group in FreeIPA called, for example, myapp_developers. You can then assign this group the built-in edit role, but this time use a RoleBinding that is tied to a particular namespace:\napiVersion: rbac.authorization.k8s.io/v1 kind: RoleBinding metadata: name: myapp-developers-edit namespace: myapp roleRef: apiGroup: rbac.authorization.k8s.io kind: ClusterRole name: edit subjects: - apiGroup: rbac.authorization.k8s.io kind: Group name: oidc:myapp_developers Using the cluster \u0026nbsp; It is beyond the scope of this documentation to discuss how to use Kubernetes: please refer to the Kubernetes documentation for that. This section describes some things about the way Kubernetes is deployed by CaaS that will make a difference to how your applications are deployed.\nIngress \u0026nbsp; In CaaS Kubernetes, Ingress resources are handled by the Nginx Ingress Controller, which is exposed at the external IP used by the master node. The Ingress Controller supports a wide range of Ingress annotations that can be used to customise the behaviour for particular services - visit the documentation for more details.\nIn order to expose a service using an Ingress resource, each host given in the resource specification must have a DNS entry that points to the external IP of the master node (where the Ingress Controller is listening). CaaS or Kubernetes will not create these DNS records for you, and it is not possible to use an IP address as a host. If you cannot create or edit DNS records, you can use xip.io (or similar services) - these are \u0026ldquo;magic domains\u0026rdquo; that provide DNS resolution for any IP address using domains of the form [subdomain.]\u0026lt;ip\u0026gt;.xip.io.\nTLS with cert-manager \u0026nbsp; CaaS Kubernetes deployments also include Jetstack\u0026rsquo;s cert- manager, which provides Kubernetes- native resources for obtaining and renewing SSL certificates - visit the documentation for more information. CaaS installs a ClusterIssuer called letsencrypt that can automatically fetch and renew browser-trusted SSL certificates from Let\u0026rsquo;s Encrypt using ACME. By using annotations, certificates can be fetched automatically for Ingress resources:\napiVersion: extensions/v1 kind: Ingress metadata: name: myapp annotations: kubernetes.io/ingress.class: \u0026#34;nginx\u0026#34; cert-manager.io/cluster-issuer: \u0026#34;letsencrypt\u0026#34; spec: tls: - hosts: - example.example.com secretName: myapp-tls # This secret will be created by cert-manager rules: - host: example.example.com http: paths: - path: / pathType: prefix backend: service name: myapp port: number: 8080 Storage \u0026nbsp; CaaS Kubernetes is also configured to take advantage of the fact that it is running on Openstack. In particular, a storage class is installed that can dynamically provision Cinder volumes in response to [persistent volume claims](https://kubernetes.io/docs/concepts/storage/persistent- volumes/#persistentvolumeclaims) being created. This storage class is called csi-cinder-sc-delete, and is consumed like this:\napiVersion: v1 kind: PersistentVolumeClaim metadata: name: myclaim spec: storageClassName: csi-cinder-sc-delete accessModes: - ReadWriteOnce resources: requests: storage: 10GiIf there is enough quota available, this persistent volume claim should result in a new Cinder volume being provisioned and bound to the claim. The Cinder volume will show up in the Volumes tab of the JASMIN Cloud Portal with a name of the form kubernetes-dynamic-pvc-\u0026lt;uuid\u0026gt;."
      })
      .add(
      
      
      {
        id: 16,
        tag: "en",
        href: "/docs/for-cloud-tenants/cluster-as-a-service-pangeo/",
        title: "Cluster-as-a-Service - Pangeo",
        description: "Cluster-as-a-Service - Pangeo",
        
        
        content: "This article describes how to deploy and use a Pangeo cluster using JASMIN Cluster-as-a-Service (CaaS).\nIntroduction \u0026nbsp; Pangeo is a community that promotes a philosophy of open, scalable and reproducible science, focusing primarily on the geosciences. As part of that effort, the Pangeo community provides a curated Python ecosystem based on popular open-source packages like xarray, Iris, Dask and Jupyter notebooks, along with documentation and recipes for deployment on various infrastructures.\nThe Pangeo cluster type in CaaS is a multi-user implementation of the Pangeo ecosystem using JupyterHub deployed on Kubernetes, giving users a scalable and fault- tolerant infrastructure to use for doing science, all through a web-browser interface. Authentication is handled by the Identity Manager for the tenancy via JupyterHub\u0026rsquo;s LDAP integration. Each authenticated user gets their own Jupyter notebook environment running in its own container, isolated from other users. The automatic spawning of containers for authenticated users is handled by JupyterHub, which also provides an interface for admins to manage the running containers. This is achieved by using the Pangeo Helm chart to deploy the Pangeo ecosystem on a CaaS Kubernetes cluster.\nCluster configuration \u0026nbsp; The Pangeo ecosystem is deployed on top of CaaS Kubernetes, so all the configuration variables for Kubernetes also apply to Pangeo clusters.\nIn addition, the following variables are available to configure the Pangeo installation:\nVariable Description Required? Can be updated? Notebook CPUs The number of CPUs to allocate to each user notebook environment. Yes Yes Notebook RAM The amount of RAM, in GB, to allocate to each user notebook environment. Yes Yes Notebook storage The amount of persistent storage, in GB, to allocate to each user notebook environment. This is where users will store their notebooks and any other files they import. The storage is persistent across notebook restarts - a user can shut down their notebook server and start a new server later without losing their data. Backups are not provided - if required, they are the responsibility of the user or cluster admins. Yes Yes Pangeo domain The domain to use for the Pangeo notebook web interface.\nIf left empty, pangeo.\u0026lt;dashed-external-ip\u0026gt;.sslip.io is used. For example, if the selected external IP is 192.171.139.83, the domain will be pangeo.192-171-139-83.sslip.io.\nIf given, the domain must already be configured to point to the selected External IP (see Kubernetes configuration), otherwise configuration will fail. Only use this option if you have control over your own DNS entries - the CaaS system or Kubernetes will not create a DNS entry for you. No No These variables define the amount of resource available to each user for processing - in order to appropriately configure (a) the size of your cluster worker nodes and (b) the resources for each notebook environment, you will need to consider how many users you are expecting and what workloads they might want to run.\nAccessing the cluster \u0026nbsp; Access to the underlying Kubernetes cluster is achieved in the same way as any other CaaS Kubernetes cluster.\nThe Pangeo web interface will be available at https://\u0026lt;pangeo domain\u0026gt;. Access to the Pangeo interface is managed through FreeIPA, and users sign in with the same username and password as for other clusters. As part of the cluster configuration, CaaS will create a FreeIPA group called \u0026lt;clustername\u0026gt;_notebook_users. Granting access to the Pangeo interface is as simple as adding a user to this group.\nBefore adding user to group:\nAdding user to group: before And after:\nAdding user to group: after Using the Pangeo environment \u0026nbsp; A full discussion of the capabilities of Jupyter notebooks, the JupyterLab environment and the many libraries included in the Pangeo ecosystem is beyond the scope of this documentation. There are plenty of examples on the web, and Pangeo provide some [example notebooks](https://github.com/pangeo-data/pangeo- example-notebooks).\nAs a very brief example of the power and simplicity of Jupyter notebooks, especially on Kubernetes, this short video (no sound) shows a user signing into a CaaS Pangeo cluster and uploading a notebook. When run, the notebook spawns a Dask cluster inside Kubernetes and uses it to perform a noddy but relatively time-consuming calculation. You can see the Dask cluster scale up to meet demand in the Dask dashboard:\nAdministering the hub \u0026nbsp; JupyterHub allows admin users to manage the notebooks running in the system, and even to impersonate other users. Unfortunately, the JupyterHub LDAP integration does not currently allow for an entire group to be designated as admins, so admin access in JupyterHub is granted specifically to the FreeIPA admin user.\nTo access the admin section, first click Hub \u0026gt; Control Panel in the JupyterLab interface:\nAdministering the hub (1) This will open the JupyterHub control panel - any user can use this to start and stop their notebook server, but admins see an extra Admin tab:\nAdministering the hub (2) Clicking on this tab will show a list of the users in the hub, along with buttons to start and stop the servers for those users:\nAdministering the hub (3) Additional admins can be added by clicking the edit user button for that user. This will pop up a dialogue:\nAdministering the hub (4) Check the Admin checkbox and click Edit User to save. The user is now an admin for the hub."
      })
      .add(
      
      
      {
        id: 17,
        tag: "en",
        href: "/docs/for-cloud-tenants/cluster-as-a-service-shared-storage/",
        title: "Cluster-as-a-Service - Shared storage",
        description: "Cluster-as-a-Service - Shared storage",
        
        
        content: "This article describes how to deploy and use shared storage clusters using JASMIN Cluster-as-a-Service (CaaS).\nIntroduction \u0026nbsp; CaaS provides shared storage clusters that can be mounted on multiple nodes to provide common storage across all those nodes.\nThese storage clusters are not intended to be directly consumed by users, but are taken as cluster configuration options by other clusters. In particular, Slurm clusters take a shared storage cluster as a configuration option - the shared storage is mounted on each cluster node for user home directories.\nNFS \u0026nbsp; Network File System (NFS) is a protocol for accessing remote network-attached storage. NFS is also used to refer to the implementation of the protocol in the Linux kernel.\nA CaaS NFS shared storage cluster provides a simple NFS server. A volume is attached of the specified size, formatted as an XFS filesystem, mounted at /srv and exported with no authentication.\nNFS servers do not get an external IP, and so are only accessible from the tenancy\u0026rsquo;s internal network.\nCluster configuration \u0026nbsp; The following variables are available to configure an NFS cluster:\nVariable Description Required? Can be updated? Identity manager The CaaS Identity Manager that is used to control access to the cluster. Yes No Volume size The size of the NFS data volume in GB. Yes No Size The size to use for the NFS server. Yes No"
      })
      .add(
      
      
      {
        id: 18,
        tag: "en",
        href: "/docs/for-cloud-tenants/cluster-as-a-service-slurm/",
        title: "Cluster-as-a-Service - Slurm",
        description: "Cluster-as-a-Service - Slurm",
        
        
        content: "This article describes how to deploy and use a Slurm cluster using JASMIN Cluster-as-a-Service (CaaS).\n\u0026nbsp; CaaS Slurm clusters are currently disabled because of a security problem with the images that were being used. We are working on a new system which will provide slurm clusters. Introduction \u0026nbsp; The Slurm Workload Manager is a popular open- source job scheduler. It provides facilities for executing and monitoring workloads across a set of nodes and managing contention for those nodes by maintaining a queue of pending jobs.\nSlurm is a powerful scheduling system, and a full discussion of the available commands and options is beyond the discussion of this article - please consult the Slurm documentation. This article focuses on the specifics of how to deploy and access a Slurm cluster in CaaS.\nIn CaaS, a Slurm cluster consists of a single login node and several worker nodes. The Linux users and groups on the cluster are managed by the Identity Manager for the tenancy, meaning that SSH access to the nodes can be controlled using FreeIPA groups. User home directories are mounted on all nodes using a shared storage cluster. Slurm is configured with a single queue, to which all the compute hosts are added.\nThe login node can optionally be assigned an external IP, however external IPs are a scarce resource in the JASMIN Cloud - if you want to preserve your external IPs for other clusters, you can use the Identity Manager gateway host as a jump host.\nCluster configuration \u0026nbsp; The following variables are available to configure a Slurm cluster:\nVariable Description Required? Can be updated? Identity manager The CaaS Identity Manager that is used to control access to the cluster. Yes No Shared storage The shared storage cluster to use for user home directories. Yes No Worker nodes The number of worker nodes in the cluster. This can be scaled up or down after deployment. When scaling down, there is currently no effort made to drain the hosts in order to remove them gracefully: jobs executing on the removed hosts will fail. This may change in the future. Yes Yes Login node size The size to use for the login node. Yes No Compute node size The size to use for the compute nodes. Yes No External IP The external IP to attach to the login node. This is optional - if not given, the cluster can still be accessed by using the Identity Manager\u0026rsquo;s gateway host as a jump host for SSH. No No Accessing the cluster \u0026nbsp; The Slurm hosts are configured to use the users and groups from FreeIPA using SSSD. They are also configured to use SSH keys from FreeIPA for SSH authentication (password-based SSH is disabled).\nFor every Slurm cluster that is deployed, CaaS automatically creates a group in FreeIPA called \u0026lt;clustername\u0026gt;_users. This group, along with the admins group, are permitted SSH access to the hosts in the cluster. To permit a user SSH access to a Slurm cluster, they just need to be added to one of these groups (depending on whether you also want them to be an admin on other clusters).\nOnce they have been added to one of these groups, the Slurm cluster can be accessed via SSH. The following is an example of accessing a Slurm cluster without an external IP using the Identity Manager\u0026rsquo;s gateway as a jump host:\n# Add SSH key to the session ssh-add /path/to/ssh/key # SSH to the identity manager gateway with agent forwarding enabled ssh -A jbloggs@192.171.139.83 # SSH to the Slurm login node ssh 192.168.3.16 # Check that we are in our home directory pwd /home/users/jbloggs # Check the Slurm status sinfo PARTITION AVAIL TIMELIMIT NODES STATE NODELIST compute* up 1-00:00:00 3 idle slurm-compute-[0-2] # Run a simple job srun -N3 -l /bin/hostname 0: slurm-compute-0.novalocal 1: slurm-compute-1.novalocal 2: slurm-compute-2.novalocal A more in-depth discussion of the capabilities of Slurm is beyond the scope of this document - please refer to the Slurm documentation."
      })
      .add(
      
      
      {
        id: 19,
        tag: "en",
        href: "/docs/software-on-jasmin/community-software-checksit/",
        title: "Community Software: checksit",
        description: "Community Software: checksit",
        
        
        content: "Overview \u0026nbsp; checksit is a tool that checks the structure and content of a file against a range of available checks. Checks can be made using either \u0026ldquo;spec\u0026rdquo; files defining rules that objects within a file must meet, or comparison against a template file.\nWhilst initial development focussed around the standards developed for NCAS data, checksit can be adapted to check files against any desired requirements.\nFeatures \u0026nbsp; Currently, checksit can:\nuse spec files and define rules against which to check files check a file against a given template file check for compliance against NCAS-GENERAL-2.0.0 and NCAS-IMAGE-1.0 standards output in either \u0026ldquo;standard\u0026rdquo; mode or a one line \u0026ldquo;compact\u0026rdquo; mode summarise output from multiple \u0026ldquo;compact\u0026rdquo; mode file checks Work in progress includes:\ncheck for compliance against other NCAS standards (e.g. NCAS-RADAR) check against future versions of standards (NCAS-GENERAL-2.1.0 and NCAS-IMAGE-1.1) allow user defined specs and rules Visit the GitHub repository linked at the bottom of this page for further information on what is being worked on. Use on JASMIN \u0026nbsp; checksit is available on all sci machines. To check a file in your current directory:\n/apps/jasmin/community/checksit/checksit check name-of-file.ext For a complete guide on how to use checksit, please visit the documentation site linked at the bottom of this page.\nFurther information \u0026nbsp; Documentation: https://checksit.readthedocs.io/en/latest/\nGitHub: https://github.com/cedadev/checksit"
      })
      .add(
      
      
      {
        id: 20,
        tag: "en",
        href: "/docs/software-on-jasmin/community-software-esmvaltool/",
        title: "Community Software: ESMValTool",
        description: "Community Software: ESMValTool",
        
        
        content: "ESMValTool is installed on JASMIN as a community package. This article provides:\na brief overview of the ESMValTool software a description of the main features of the tool a quick-start for using ESMValTool on JASMIN links to further information Overview of ESMValTool \u0026nbsp; The Earth System Model Evaluation Tool (ESMValTool) is a community diagnostics and performance metrics tool for the evaluation of Earth System Models (ESMs) that allows for routine comparison of single or multiple models, either against predecessor versions or against observations. The priority of the effort so far has been to target specific scientific themes focusing on selected Essential Climate Variables, a range of known systematic biases common to ESMs, such as coupled tropical climate variability, monsoons, Southern Ocean processes, continental dry biases and soil hydrology-climate interactions, as well as atmospheric CO2 budgets, tropospheric and stratospheric ozone, and tropospheric aerosols.\nThe tool is being developed in such a way that additional analyses can easily be added. A set of standard recipes for each scientific topic reproduces specific sets of diagnostics or performance metrics that have demonstrated their importance in ESM evaluation in the peer-reviewed literature. The ESMValTool is a community effort open to both users and developers encouraging open exchange of diagnostic source code and evaluation results from the CMIP ensemble. This will facilitate and improve ESM evaluation beyond the state-of- the-art and aims at supporting such activities within the Coupled Model Intercomparison Project (CMIP) and at individual modelling centres. Ultimately, we envisage running the ESMValTool alongside the Earth System Grid Federation (ESGF) as part of a more routine evaluation of CMIP model simulations while utilizing observations available in standard formats (obs4MIPs) or provided by the user.\nInstallation as a \u0026ldquo;community package\u0026rdquo; on JASMIN \u0026nbsp; ESMValTool is installed on JASMIN as a community package. This means it is provided, and maintained, by developers outside the CEDA/JASMIN Team. If you have queries about using ESMValTool on JASMIN then please contact the JASMIN Helpdesk and we will forward them to the team that supports this package on JASMIN.\nMain Features \u0026nbsp; ESMValTool has the following features:\nFacilitates the complex evaluation of ESMs and their simulations submitted to international Model Intercomparison Projects (e.g., CMIP). Standardized model evaluation can be performed against observations, against other models or to compare different versions of the same model. Wide scope: includes many diagnostics and performance metrics covering different aspects of the Earth System (dynamics, radiation, clouds, carbon cycle, chemistry, aerosol, sea-ice, etc.) and their interactions. Well-established analysis: standard namelists reproduce specific sets of diagnostics or performance metrics that have demonstrated their importance in ESM evaluation in the peer-reviewed literature. road documentation: a user guide (Eyring et al., 2015); SPHINX; a log-file is written containing all the information of a specific call of the main script: creation date of running the script, version number, analyzed data (models and observations), applied diagnostics and variables, and corresponding references. This helps to increase the traceability and reproducibility of the results. High flexibility: new diagnostics and more observational data can be easily added. Multi-language support: Python, NCL, R\u0026hellip; other open-source languages are possible. CF/CMOR compliant: data from many different projects can be handled (CMIP, obs4mips, ana4mips, CCMI, CCMVal, AEROCOM, etc.). Routines are provided to CMOR-ize non-compliant data. Integration in modelling workflows: for EMAC, NOAA-GFDL and NEMO, can be easily extended. Quick User Guide on JASMIN \u0026nbsp; The latest version of ESMValTool is available for users on JASMIN and can be accessed via a standard module:\nmodule load esmvaltool To run a yaml-formatted recipe:\nesmvaltool run recipe.yml For a complete guide on how to configure the tool, set up and run available diagnostic recipes please consult the documentation at: https://docs.esmvaltool.org/en/latest/\nFurther information \u0026nbsp; Documentation: https://docs.esmvaltool.org/en/latest/ Website: https://www.esmvaltool.org/index.html GitHub: https://github.com/ESMValGroup/ESMValTool"
      })
      .add(
      
      
      {
        id: 21,
        tag: "en",
        href: "/docs/software-on-jasmin/conda-environments-and-python-virtual-environments/",
        title: "Conda environments and Python virtual environments",
        description: "Conda environments and Python virtual environments",
        
        
        content: "Introduction \u0026nbsp; This article describes two types of software environments that you can create in order to install packages for your own use on JASMIN. Typical examples why you may wish to do this is if you have asked us to add packages to Jaspy but wish to make use of them before the next release, or if they are not likely to be relevant to other users.\nSeparate pages explain the details of how to create and install Python virtual environments and Conda environments. This page gives an overview of what they are, and how to choose which one is most suitable for your needs.\nDescription of Python virtual environments and Conda environments \u0026nbsp; A Python virtual environment is a relatively lightweight environment, which is used for running Python packages, typically installed using the \u0026ldquo;pip\u0026rdquo; installer from the Python Package Index (pypi) or locally from Python source containing a \u0026ldquo;setup.py\u0026rdquo; file. This enables you to install packages in your home directory without writing to the underlying Python installation itself (for example when you do not have write permission), and you can have any number of separate virtual environments and \u0026ldquo;activate\u0026rdquo; the relevant one when needed. When you run \u0026ldquo;pip\u0026rdquo; to install a Python package, additional Python packages may be installed automatically in order to satisfy dependencies. Depending on the package being installed, if it requires compiled libraries to accompany it, it may try to compile these locally, but depending what development libraries are available, occasionally this might not succeed. By contrast, a Conda environment is a much bulkier, more fully featured environment, using the conda package manager. This enables the installation of packages from conda channels, typically conda-forge, which are not restricted to being Python packages. Where packages contain compiled libraries, these are generally available as pre-compiled binaries. As with python virtual environments, you can have any number of these environments and activate the required one. When you run the conda installer, similarly it will install whatever additional packages are required in order to satisfy dependencies. (It is also possible to use the pip installer when working with conda environments.) Environment size \u0026nbsp; To take an example of the size, a new Python virtual environment without additional packages occupies about 10MB and contains under 1000 files (maybe approximately twice this if using the --system-site-packages option explained in more detail elsewhere), whereas as a new conda base environment occupies about 400MB and contains over 20,000 files.\nInstallation examples \u0026nbsp; To give an example of installing a Python package, the numexpr library is a numerical expression evaluator for NumPy. It is available as a pip package called numexpr, and also as a conda package called numexpr. (For some packages, the two may have slightly different names.) It can be installed successfully into either a Python virtual environment using pip install numexpr or a conda environment using conda install numexpr. In either case, the numpy package on which it depends, amongst other things, will be installed automatically if required.\nTo give an example of installing a non-python package, zsh is a Unix shell which combines various features of bash and csh. You cannot install this using pip install because it is not a python package, but it is available on conda-forge, and can be installed into a conda environment using conda install zsh.\nCombining environments \u0026nbsp; We already provide a wide range of packages via Jaspy. This is in itself a conda environment, and it is important to note that although you can use a Python virtual environment to install additional packages when using a conda environment, you cannot have more than one conda environment activated at the same time.\nWhen using Python virtual environments, you are advised to start by activating a Jaspy environment, as this will ensure that you are using a version of Python that we support, as well as significantly increasing the range of compiled libraries available during the \u0026ldquo;pip install\u0026rdquo; process. You can also use the \u0026ldquo;\u0026ndash;system-site-packages\u0026rdquo; option to access the Python packages provided by Jaspy itself, as described in more detail on the virtual environments help page. However, if you choose to use your own conda environment, then you will activate it instead of Jaspy, and you will need to install into it everything that you will need to accompany the package which you wish to use. Note that because you can install pip packages into conda environment, it is not generally useful to create a virtual environment in order to extend your own private conda environment. The reason for creating one to extend Jaspy is that users do not have write permission to add packages to Jaspy itself.\nChoosing between a Python virtual environment and a Conda environment \u0026nbsp; Because python virtual environments are much more lightweight that conda environments, and also give you access to packages that we provide via Jaspy, we would generally recommend that you start by trying a Python virtual environment. However, this might prove not to be possible, for example because:\nThe package that you wish to install is not available via PyPI (perhaps it is not a Python package). The package that you wish to install depends on compiled libraries that do not build successfully during a \u0026ldquo;pip install\u0026rdquo;. Often pre-compiled versions will be available from conda-forge. If you do decide to install a conda environment, then remember to install additional packages that you might otherwise have used via Jaspy."
      })
      .add(
      
      
      {
        id: 22,
        tag: "en",
        href: "/docs/short-term-project-storage/configuring-cors-for-object-storage/",
        title: "Configuring CORS for object storage",
        description: "Confguring cross-origin resource sharing (CORS) for object storage.",
        
        
        content: "Introduction \u0026nbsp; This article describes how to configure Cross-Origin Resource Sharing (CORS) on a JASMIN Caringo S3 object store.\nS3 CORS configuration \u0026nbsp; JASMIN\u0026rsquo;s DataCore (previously Caringo) S3 object storage allows domain owners to configure Cross-Origin Resource Sharing (CORS) at bucket level. This article assumes you have read the this help article which introduces the object store and the use of the s3cmd command line tool.\nPrerequisites \u0026nbsp; You will need a valid S3 Token ID and Secret Key for the domain that you wish to modify.\ne.g.\nkey will not be displayed again! Token ID: \u0026lt;The Token for your Domain\u0026gt; S3 Secret Key: \u0026lt;The Secret for your Domain\u0026gt; Expiration Date: 2024-02-13 Owner: \u0026lt;Your JASMIN ID\u0026gt; Description: test See using s3cmd for instructions on generating these. CORS XML Configuration File \u0026nbsp; CORS configuration is set on the S3 bucket using an XML file format, as shown below:\n\u0026lt;CORSConfiguration\u0026gt; \u0026lt;CORSRule\u0026gt; \u0026lt;AllowedOrigin\u0026gt;http://www.example1.com\u0026lt;/AllowedOrigin\u0026gt; \u0026lt;AllowedMethod\u0026gt;PUT\u0026lt;/AllowedMethod\u0026gt; \u0026lt;AllowedMethod\u0026gt;POST\u0026lt;/AllowedMethod\u0026gt; \u0026lt;AllowedMethod\u0026gt;DELETE\u0026lt;/AllowedMethod\u0026gt; \u0026lt;AllowedHeader\u0026gt;*\u0026lt;/AllowedHeader\u0026gt; \u0026lt;/CORSRule\u0026gt; \u0026lt;CORSRule\u0026gt; \u0026lt;AllowedOrigin\u0026gt;http://www.example2.com\u0026lt;/AllowedOrigin\u0026gt; \u0026lt;AllowedMethod\u0026gt;PUT\u0026lt;/AllowedMethod\u0026gt; \u0026lt;AllowedMethod\u0026gt;POST\u0026lt;/AllowedMethod\u0026gt; \u0026lt;AllowedMethod\u0026gt;DELETE\u0026lt;/AllowedMethod\u0026gt; \u0026lt;AllowedHeader\u0026gt;*\u0026lt;/AllowedHeader\u0026gt; \u0026lt;/CORSRule\u0026gt; \u0026lt;CORSRule\u0026gt; \u0026lt;AllowedOrigin\u0026gt;*\u0026lt;/AllowedOrigin\u0026gt; \u0026lt;AllowedMethod\u0026gt;GET\u0026lt;/AllowedMethod\u0026gt; \u0026lt;/CORSRule\u0026gt; \u0026lt;/CORSConfiguration\u0026gt;The above example shows a configuration which allows CORS access from external web sites www.example1.com and www.example2.com.\nYou can create a new file on your filesystem to store your CORS configuration using the above example as a reference. In the next step, you\u0026rsquo;ll learn how to apply this file to your bucket.\nApplying CORS Settings to a Bucket \u0026nbsp; To apply the CORS XML file you\u0026rsquo;ve created, you can use any S3 compatible client to set the CORS configuration.\nThe following example uses s3cmd on a Linux system.\nFirst confirm that your s3cmd settings are correct by showing the info of the bucket.\ne.g.\ns3cmd info s3://testbin1 s3://testbin1/ (bucket): Location: objectstore4.jc.rl.ac.uk Payer: none Expiration Rule: none Policy:  \u0026#34;Version\u0026#34;:\u0026#34;2008-10-17\u0026#34;, \u0026#34;Id\u0026#34;:\u0026#34;testbin1 Policy\u0026#34;, \u0026#34;Statement\u0026#34;: [  \u0026#34;Sid\u0026#34;:\u0026#34;1: Full access for Users\u0026#34;, \u0026#34;Effect\u0026#34;:\u0026#34;Allow\u0026#34;, \u0026#34;Principal\u0026#34;:\u0026#34;anonymous\u0026#34;:[\u0026#34;*\u0026#34;], \u0026#34;Action\u0026#34;:[\u0026#34;*\u0026#34;], \u0026#34;Resource\u0026#34;:\u0026#34;*\u0026#34; ,  \u0026#34;Sid\u0026#34;:\u0026#34;2: Read-only access for Everyone\u0026#34;, \u0026#34;Effect\u0026#34;:\u0026#34;Allow\u0026#34;, \u0026#34;Principal\u0026#34;:\u0026#34;anonymous\u0026#34;:[\u0026#34;*\u0026#34;], \u0026#34;Action\u0026#34;:[\u0026#34;GetObject\u0026#34;,\u0026#34;GetBucketCORS\u0026#34;], \u0026#34;Resource\u0026#34;:\u0026#34;*\u0026#34;  ]  CORS: none ACL: ahuggan: FULL_CONTROL This example shows a bucket which currently doesn\u0026rsquo;t have a CORS policy set. Specifically, this is the section we\u0026rsquo;re interested in:\nCORS: noneIn this example, we\u0026rsquo;ll set a simple \u0026ldquo;allow all\u0026rdquo; CORS configuration. We\u0026rsquo;ve already created a file named test-cors-file which we will be uploading to the bucket:\n\u0026lt;CORSConfiguration\u0026gt; \u0026lt;CORSRule\u0026gt; \u0026lt;AllowedOrigin\u0026gt;*\u0026lt;/AllowedOrigin\u0026gt; \u0026lt;AllowedMethod\u0026gt;GET\u0026lt;/AllowedMethod\u0026gt; \u0026lt;AllowedMethod\u0026gt;HEAD\u0026lt;/AllowedMethod\u0026gt; \u0026lt;AllowedHeader\u0026gt;*\u0026lt;/AllowedHeader\u0026gt; \u0026lt;/CORSRule\u0026gt; \u0026lt;/CORSConfiguration\u0026gt;Using the s3cmd command, we apply the CORS XML file to our S3 bucket:\ns3cmd setcors test-cors-file s3://testbin1 (your S3 address will be different to the one shown here)\nWe can now run the info command to confirm that the CORS configuration from our file has been set on the bucket:\ns3cmd info s3://testbin1 s3://testbin1/ (bucket): Location: objectstore4.jc.rl.ac.uk Payer: none Expiration Rule: none Policy:  \u0026#34;Version\u0026#34;:\u0026#34;2008-10-17\u0026#34;, \u0026#34;Id\u0026#34;:\u0026#34;testbin1 Policy\u0026#34;, \u0026#34;Statement\u0026#34;: [  \u0026#34;Sid\u0026#34;:\u0026#34;1: Full access for Users\u0026#34;, \u0026#34;Effect\u0026#34;:\u0026#34;Allow\u0026#34;, \u0026#34;Principal\u0026#34;:\u0026#34;anonymous\u0026#34;:[\u0026#34;*\u0026#34;], \u0026#34;Action\u0026#34;:[\u0026#34;*\u0026#34;], \u0026#34;Resource\u0026#34;:\u0026#34;*\u0026#34; ,  \u0026#34;Sid\u0026#34;:\u0026#34;2: Read-only access for Everyone\u0026#34;, \u0026#34;Effect\u0026#34;:\u0026#34;Allow\u0026#34;, \u0026#34;Principal\u0026#34;:\u0026#34;anonymous\u0026#34;:[\u0026#34;*\u0026#34;], \u0026#34;Action\u0026#34;:[\u0026#34;GetObject\u0026#34;,\u0026#34;GetBucketCORS\u0026#34;], \u0026#34;Resource\u0026#34;:\u0026#34;*\u0026#34;  ]  CORS: \u0026lt;CORSConfiguration\u0026gt; \u0026lt;CORSRule\u0026gt; \u0026lt;AllowedOrigin\u0026gt;*\u0026lt;/AllowedOrigin\u0026gt; \u0026lt;AllowedMethod\u0026gt;HEAD\u0026lt;/AllowedMethod\u0026gt; \u0026lt;AllowedMethod\u0026gt;GET\u0026lt;/AllowedMethod\u0026gt; \u0026lt;AllowedHeader\u0026gt;*\u0026lt;/AllowedHeader\u0026gt; \u0026lt;/CORSRule\u0026gt; \u0026lt;/CORSConfiguration\u0026gt; ACL: ahuggan: FULL_CONTROL To delete the CORS config from the bucket, we can run the following command:\ns3cmd delcors s3://testbin1 s3://testbin1/: CORS deleted"
      })
      .add(
      
      
      {
        id: 23,
        tag: "en",
        href: "/docs/interactive-computing/creating-a-virtual-environment-in-the-notebooks-service/",
        title: "Creating a virtual environment in the jasmin notebooks service",
        description: "Creating a virtual environment in the notebooks service",
        
        
        content: "Creating a virtual environment is useful to allow a discrete set of extra packages to be installed to meet specific requirements. This allows a user to run multiple environments with different dependencies without conflicts.\nThere are a number of ways to create a virtual environment to use with the notebook service. This document outlines the most common and reccomended methods, and then some other ways which you might find useful.\nPlease note that environments created for the notebook service will not work on the jasmin scientific analysis servers or the LOTUS batch processing.\nStep 1: Creating a virtual environment \u0026nbsp; This step creates a python virtual environment, and allows you to install packages into it.\n\u0026nbsp; These commands are intended for use at the jupyter notebooks shell, not on the JASMIN sci machines To get started, head to https://notebooks.jasmin.ac.uk and click the terminal button.\nterminal button Then, type these commands at the bash shell which appears.\nFirst, make a directory in which to store your virtual environments. You can put this wherever you like, as long as you reference the same place later. You could store several virtual environments within this directory, for different purposes. Then, change into that directory.\nmkdir ~/nb_envs cd ~/nb_envs Next, create a new empty virtual environment. We recommended including the --system-site-packages argument which will allow you to add packages on top of jaspy, rather than starting completely from scratch.\npython -m venv name-of-environment --system-site-packages Then, activate the specific virtual environment created above, which will allow you to install packages.\nsource name-of-environment/bin/activate If you want to be able to use your virtual environment as a jupyter notebook kernel (reccomended), you should install ipykernel using pip.\npip install ipykernel You can then install whatever packages you need in the environment.\npip install pyjokes If you change your mind and need to add more packages in the future, it is simple to activate the virtual environment in the same way as above and use pip to install more packages.\nStep 2: Making the notebook service recognise your new kernel. \u0026nbsp; These steps are also run from the notebooks\u0026rsquo; service shell, as above.\nIf you aren\u0026rsquo;t still there from the last step, cd to the location of your venv.\ncd ~/nb_envs If it isn\u0026rsquo;t already active, activate the virtual environment.\nsource name-of-environment/bin/activate Running the following command will make the notebook\u0026rsquo;s service notice your new virtual environment, and include it in the list of kernels which you can run code with. You only have to do this once.\npython -m ipykernel install --user --name=name-of-environment Step3: Using Your New Kernel \u0026nbsp; Select kernel, in this case: 'name-of-environment' You can then choose this kernel from the jupyterhub homepage, or from the top right of any open notebook. No changes to the python code within are required.\nkernel name in notebook title tab Other tips \u0026amp; useful knowledge \u0026nbsp; Activating an environment without it being a kernel. \u0026nbsp; If you follow Step 1 above to create a virtual environment, it is possible to use the packages from this environment in a python file without making it a kernel. While this can be useful, it has the very distinct disadvantage of hardcoding the path to your virtual environment in your python code. For this reason we discourage using this method with a medium level of severity. To do this, simply add the following code to your python file before any imports. Adjust the venv_path variable to be correct for the venv you created.\nimport sys import pathlib import platform venv_path = \u0026#34;~/nb_envs/name-of-environment\u0026#34; py_version = platform.python_version_tuple() sys.path.append( str( pathlib.Path( f\u0026#34;venv_path/lib/pythonpy_version[0].py_version[1]/site-packages/\u0026#34; ).expanduser() ) )Explanation: this adds the site-packages folder from your venv directly to the path python uses to search for packages ($PYTHONPATH). This lets python find them to import.\nCan I install packages from inside my python code? \u0026nbsp; We very strongly recomend NOT trying to install python packages from inside notebook code. pip isn\u0026rsquo;t designed for it, and it is almost always easier to activate the venv as above and install things that way.\nIf you wish to record the set of packages inside your venv so you can install them en-masse later, pip has the facility to do this. To export a list of packages that exist inside a venv, from the notebooks bash shell with the virtual environment in question activated:\npip freeze \u0026gt; requirements.txt To install a list of packages which have been exported:\npip install -r requirements.txt Exporting packages in this way is also useful for sharing your environment with others, reinstalling when it breaks etc. It\u0026rsquo;s a good idea to keep the requirements file alongside the code in version control. If your code becomes more complex it is probably more sensible to make it a python package, and install it as one, but doing that is outside the scope of this document.\nIf you really must, you can call pip from inside your notebook like this: (after first updating the packages variable to be the ones you want to install.)\nimport sys import subprocess as sp packages = [\u0026#39;pyjokes\u0026#39;] sp.check_call([sys.executable, \u0026#39;-m\u0026#39;, \u0026#39;pip\u0026#39;, \u0026#39;install\u0026#39;] + packages) Can I use conda instead of a virtual environment? \u0026nbsp; Yes, no problem.\nTo create a conda environment, sinply run the following at the JASMIN Notebooks shell:\nconda create --name name-insert-here ipykernel Install any packages you which to use in the environment:\nconda install --name name-insert-here pyjokes Make the notebook service recognise your environment as a kernel:\nconda run --name name-insert-here python -m ipykernel install --user --name name-insert-here Can I get rid of my old kernels from the notebook service? \u0026nbsp; Yes.\nTo list the names of kernels you have installed, run the following at the JASMIN notebook\u0026rsquo;s shell:\njupyter kernelspec list To remove one of them, run:\njupyter kernelspec uninstall insert-name-here"
      })
      .add(
      
      
      {
        id: 24,
        tag: "en",
        href: "/docs/software-on-jasmin/creating-and-using-miniconda-environments/",
        title: "Creating and using miniconda environments",
        description: "Creating and using miniconda environments",
        
        
        content: "On JASMIN, we provide a wide range of packages via the Jaspy environment (which is itself a Conda environment). This page gives detail on how to create and use your own personal Conda environments via the miniconda installer, as an alternative to the use of Jaspy.\nTo decide whether you should use a Python virtual enviro nment or a Conda environment , first see the page: overview of software environments.\nObtaining miniconda \u0026nbsp; In order to create your own conda environments, you will first need to download the miniconda installer. It is possible as an alternative to use the full Anaconda, but your initial base environment will be much bigger if you do that (at time of writing this installs 5GB, compared to 400MB with miniconda) so we suggest the use of miniconda.\nThis can be downloaded using:\nwget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh Deactivating Jaspy \u0026nbsp; You cannot have your own conda environment activated at the same time as Jaspy, so it is recommended that if you have loaded the jaspy module, then you start by typing:\nmodule unload jaspy Creating a base environment \u0026nbsp; You can run the installer by typing:\nbash Miniconda3-latest-Linux-x86_64.sh\nYou will be asked to confirm the licence agreement, to choose an installation location, and to decide whether it should run \u0026ldquo;conda init\u0026rdquo;. It is recommended that you:\nAccept the default location (~/miniconda3). If you need to change this, see the section \u0026ldquo;Varying the installation location\u0026rdquo; near the end of this page for more info. Say no to the question about \u0026ldquo;conda init\u0026rdquo;, because saying yes will cause it to add lines to your ~/.bashrc file causing your base environment to be activated every time you log in, which may interfere with the use of Jaspy. If you say no, you can still follow the instructions below when you wish to activate your base environment. (Add the -b option at the end of the above command to run the installer in batch mode, which will also skip the \u0026ldquo;conda init\u0026rdquo;. Or add -h to see help on other available command-line options.)\nActivating the base environment \u0026nbsp; Assuming that you made the choices recommended above when running the installer, you should type the following in order to activate the base environment:\nsource ~/miniconda3/bin/activate(You may encounter documentation elsewhere which suggests \u0026ldquo;conda activate\u0026rdquo; instead, but the above command is a workaround for the fact that you have not run \u0026ldquo;conda init\u0026rdquo;, the reasons for which are explained above.)\nYour command prompt will then change to include \u0026ldquo;(base) \u0026quot; at the start, in order to remind you that this environment is activated. You can deactivate the environment by typing:\nconda deactivate Creating and activating a sub-environment \u0026nbsp; Although once you have activated the base conda environment, you can in principle start to install packages immediately, your use of conda will generally be better organised if you do not install packages directly into the base environment, but instead use a named sub-environment. You can have multiple sub-environments under a single base environment, and activate the one that is required at any one time. Unless you install packages directly into the base environment, your sub-environments will work independently.\nTo create a named environment (for example, called \u0026ldquo;myenv\u0026rdquo;), ensure that the base environment is activated (the command prompt should start with \u0026ldquo;(base) \u0026ldquo;), and type:\nconda create -n myenvIt will show the proposed installation location, and once you answer the prompt to proceed, will do the installation. If you have followed these instruction, this location should be /home/users/\u0026lt;your_username\u0026gt;/miniconda3/envs/myenv. You can alternatively give it a different location using the option -p \u0026lt;path\u0026gt; instead of -n \u0026lt;name\u0026gt;.\nOnce you have created your sub-environment, you can activate it using conda activate \u0026lt;name\u0026gt; for example:\nconda activate myenvThe command prompt will then change (e.g. to start with \u0026ldquo;(myenv) \u0026ldquo;) to reflect this. Typing conda deactivate once will return you to the base environment; typing it a second time will deactivate conda completely (as above).\nconda env listwill list your environments.\nInstalling conda packages \u0026nbsp; Once you have activated a named environment, you can install packages with the conda install command, for example:\nconda install gccYou can also force particular versions to be installed. See the [conda cheat sheet](https://docs.conda.io/projects/conda/en/4.6.0/_downloads/52a95608c49671267e40c689e0bc00ca/conda- cheatsheet.pdf) for details.\nTo list the packages installed in the currently activated environment, you can type conda list.\nRunning packages from your conda environment \u0026nbsp; In order to run packages from a conda environment that you installed previously, you will first need to activate the environment in the session that you are using. This means repeating some of the commands typed above. Of course, you will not need to repeat the steps to create the environment or install the software, but the following may be needed again:\nmodule unload jaspy source ~/miniconda3/bin/activate` conda activate myenv` Installing pip packages \u0026nbsp; Many python packages that are available via PyPI are also available as conda packages in conda-forge, and it is generally best to use these via \u0026ldquo;conda install\u0026rdquo; as above.\nNonetheless, you can also install pip packages (as opposed to conda packages) into your conda environment. However, first you should type:\nconda install pipbefore typing the desired commands such as\npip install numpyIf you do not install pip into your sub-environment, then either:\nyour shell will fail to find the pip executable, or your shell will find pip in your base environment, which will lead to pip packages being installed into the base environment, resulting in potential interference between your conda environments Explicitly installing pip into your sub-environment will guard against this.\nThe mamba installer \u0026nbsp; When you install packages into a conda environment, the installer first has to resolve the environment. This means using available package dependency metadata in order to decide which versions of packages to install, so as to end up with a self-consistent environment. If you are working with a large environment and/or working with legacy versions of packages, sometimes (in our experience with preparing Jaspy environments) the conda installer can be very slow and use a lot of memory, and may fail to resolve the environment. In this situation, we have tended to find better performance with the mamba installer, which uses a different algorithm and is implemented in C++ rather than Python, for speed.\nTo use mamba, you would first type conda install mamba, and then you can use mamba install \u0026lt;package_name\u0026gt; instead of conda install \u0026lt;package_name\u0026gt; in order to install the other package(s) of interest. You would still use the conda command for other operations such as conda activate.\nIf you will be using mamba in multiple sub-environments, then it might make sense to install mamba into the base environment rather than each sub- environment separately, despite our general suggestion of installing packages into named sub-environments. To do this, you might need to use conda deactivate to return to the base environment before installing mamba, then re-activate your sub-environment to install other packages.\nCloning a conda environment \u0026nbsp; There can be occasions when you wish to create a conda environment which is based on the contents of an existing environment. An example when you might wish to do this is in order to create an environment of your own which is based on Jaspy but with certain changes such as the addition or removal of certain packages. (Recall that your environment cannot be activated at the same time as Jaspy.)\nTo do this, you can export a list of packages to a YAML file and use this file to create the new environment \u0026ndash; as follows:\nfirst activate the conda environment that you wish to clone (for Jaspy, load the jaspy module) export a list of contents to a YAML file (for example \u0026ldquo;environment.yml\u0026rdquo;) by typing conda env export \u0026gt; environment.yml deactivate this environment (or as the case may be, unload the jaspy module) ensure that the relevant base environment is activated create the new environment (for example \u0026ldquo;my_new_env\u0026rdquo;) by using: conda env create -n my_new_env -f environment.ymlNote the use of \u0026ldquo;conda env create\u0026rdquo;, rather than \u0026ldquo;conda create\u0026rdquo; as above.\n(As above, if you have installed mamba, you can also use \u0026ldquo;mamba\u0026rdquo; in place of \u0026ldquo;conda\u0026rdquo; at this stage.)\nYou might also edit the YAML file before using it to create the environment if you do not want an exact clone \u0026ndash; for example, adding packages, removing packages that are not of relevance, or removing version requirements in order to give the environment solver more flexibility about what versions to install (for example if you do not require particular legacy versions, or if the versions in the original environment are no longer available).\nVarying the installation location \u0026nbsp; (This is the section that is referred to above, where running the Miniconda installer is discussed.)\nThe default installation location offered by the installer for your base environment will be ~/miniconda3 (that is, a \u0026ldquo;miniconda3\u0026rdquo; subdirectory of your home directory). We recommend accepting this default, or using another location under your home directory. It is possible to change this, but note that a conda environment can have tens of thousands of files and that group workspaces on JASMIN will generally perform poorly for this use case. If you need to make a conda environment which is shared with collaborators, you may need to request a small files GWS as these will give better performance.\nIf you are creating a conda environment for very short-term testing only, you may find best performance using /tmp due to the large number of files. However, you may need several gigabytes, which is too big for the /tmp areas on most of the \u0026ldquo;sci\u0026rdquo; machines at time of writing, although sci3, sci6 and sci8 have larger /tmp areas. Choose an appropriate machine, make use of the df command to check available disk space, and ensure that you do not fill up /tmp as this would impact negatively on other users."
      })
      .add(
      
      
      {
        id: 25,
        tag: "en",
        href: "/docs/interactive-computing/dask-gateway/",
        title: "Dask Gateway",
        description: "Introduction \u0026nbsp; Dask Gateway is a service which manages Dask clusters for users. On JASMIN, it creates a Dask cluster in LOTUS, our batch computing cluster.",
        
        
        content: "Introduction \u0026nbsp; Dask Gateway is a service which manages Dask clusters for users. On JASMIN, it creates a Dask cluster in LOTUS, our batch computing cluster. It automatically creates a Dask for you, scheduling Slurm jobs to create Dask schedulers and workers as appropriate.\nPrerequisites \u0026nbsp; Before using Dask Gateway on JASMIN, you will need:\nAn existing JASMIN account and valid jasmin-login access role: Apply here\u0026nbsp; \u0026nbsp; \u0026nbsp; Subsequently (once jasmin-login has been approved and completed), the dask access role: Apply here\u0026nbsp; \u0026nbsp; \u0026nbsp; The jasmin-login access role ensures that your account is set up with access to the LOTUS batch processing cluster, while the dask role grants access to the special LOTUS partition used by the Dask Gateway service.\nCreating a Dask cluster \u0026nbsp; In the JASMIN Notebooks service \u0026nbsp; In the JASMIN notebooks service, authentication to dask-gateway happens automatically. You can use the snippet below to create a cluster and get a Dask client which you can use:\nimport dask_gateway # Create a connection to dask-gateway. gw = dask_gateway.Gateway(\u0026#34;https://dask-gateway.jasmin.ac.uk\u0026#34;, auth=\u0026#34;jupyterhub\u0026#34;) # Inspect and change the options if required before creating your cluster. options = gw.cluster_options() options.worker_cores = 2 # Create a Dask cluster, or, if one already exists, connect to it. # This stage creates the scheduler job in Slurm, so it may take some # time while your job queues. clusters = gw.list_clusters() if not clusters: cluster = gw.new_cluster(options, shutdown_on_close=False) else: cluster = gw.connect(clusters[0].name) # Create at least one worker, and allow your cluster to scale to three. cluster.adapt(minimum=1, maximum=3) # Get a Dask client. client = cluster.get_client() ######################### ### DO DASK WORK HERE ### ######################### # When you are done and wish to release your cluster: cluster.shutdown() Elsewhere on JASMIN \u0026nbsp; The following explains how to use the Dask Gateway elsewhere on JASMIN, for example, on the sci machines.\n\u0026nbsp; It is not necessary to do this if you only want to use Dask in the JASMIN notebook service. At the current time, it is still necessary to use the notebooks service to generate an API token to allow you to connect to the gateway server.\n\u0026nbsp; It is very important that your API token is not shared between users and remains secret. With it, another user could submit Dask jobs to LOTUS as you, and they could exploit this to see anything in your JASMIN account. Setup \u0026nbsp; Make a Dask configuration folder in your home directory\nmkdir -p ~/.config/dask Create a configuration file for dask-gateway\ntouch ~/.config/dask/gateway.yaml Change the permissions on the file so that only you can read it\nchmod 600 ~/.config/dask/gateway.yaml Head to the API token generator page, put a note in the box to remind yourself what this token is for, press the big orange button, then copy the token.\nPaste the following snippet into ~/.config/dask/gateway.yaml, replace the entry on the final line with the API token you just created.\ngateway: address: https://dask-gateway.jasmin.ac.uk auth: type: jupyterhub kwargs: api_token: replaceWithYourSecretAPIToken You\u0026rsquo;re done. You can now use dask-gateway from the command line.\nAccess the Dask dashboard \u0026nbsp; To get the link to your Dask dashboard, run the following:\nprint(client.dashboard_link)Currently the Dask dashboard is not accessible from a browser outside the JASMIN firewall. If your browser fails to load the dashboard link returned, please use our graphical desktop service to run a Firefox browser inside the firewall to view your dashboard.\nUse a custom Python environment \u0026nbsp; By default the JASMIN Notebooks service and Dask Gateway use the latest version of the jaspy software environment. However, often users would like to use their own software environments.\nUnderstanding the problem \u0026nbsp; When Dask Gateway creates a dask cluster for a user, it runs a setup command to activate a conda environment or python venv. To have Dask use your packages, you need to create a custom environment which you can pass to dask-gateway to activate.\nHowever, for technical reasons, it is not currently possible to use the same virtual environment in both the notebook service and on JASMIN. So you will need to make two environments, one for your notebook to use and one for Dask to use.\n\u0026nbsp; It is VERY important that these environments have the same packages installed in them, and that the packages are exactly the same version in both environments.\nIf you do not keep packages and versions in-sync you can expect many confusing errors.\nIf you use a self-contained conda environment this is not a problem, and you can use this as a kernel in the notebooks service and on the sci machines. You can skip to Putting it all together below.\nCreating a virtual environment for Dask \u0026nbsp; Login to the JASMIN sci machines. Activate jaspy module load jaspy Create your environment in the normal way python -m venv name-of-environment Activate the environment source name-of-environment/bin/activate Install dask and dask gateway and dependencies: without this step your environment will not work with dask. pip install dask-gateway dask lz4 Creating a virtual environment for the notebooks service \u0026nbsp; Follow the instructions here to create a virtual environment. Install Dask and Dask Gateway and dependencies: without this step your environment will not work with Dask. pip install dask-gateway dask lz4 Putting it all together \u0026nbsp; Set your notebook virtual environment as the kernel for the notebook in question as shown in the instructions linked above. Set options.worker_setup to a command which will activate your Dask virtual environment. For example options.worker_setup = \u0026#34;source /home/users/example/name-of-environment/bin/activate\u0026#34; If you have an existing Dask cluster, close it and ensure all LOTUS jobs are stopped before recreating it using the new environment. Code Examples \u0026nbsp; Examples of code and notebooks which can be used to test the JASMIN Dask Gateway service are available on GitHub."
      })
      .add(
      
      
      {
        id: 26,
        tag: "en",
        href: "/docs/data-transfer/data-transfer-overview/",
        title: "Data transfer overview",
        description: "Overview of data transfer",
        
        
        content: "This article introduces the topic of data transfer to/from JASMIN.\nIntroduction to Data Transfer on JASMIN \u0026nbsp; As a JASMIN user you are very likely to be involved in data transfer. You might need to copy data files/directories from JASMIN to remote sites (such as your own PC, MONSooN or ARCHER2) or bring new data on to JASMIN. These data transfer articles explain how to use the basic transfer tools such as rsync and scp as well as more sophisticated methods such as GridFTP. They also cover which transfer services and servers are available to JASMIN users.\nFor many users, moving small amounts of data over short distances, the basic tools will meet their requirements. However, data transfer is a complicated topic so we also provide articles about how you can improve your transfer rates to make the most of the available bandwidth. We include details about transfers over connections to specific sites (such as the Met Office). Advice is also provided about automating and scheduling data transfers, along with tips for different transfer workflows.\nTransfers to/from JASMIN \u0026nbsp; 1. Transfers initiated from JASMIN \u0026nbsp; When initiating a transfer from a transfer server on JASMIN you would usually start by logging on to the server (via SSH). Once you are logged in you can initiate a connection to the outside world in order to push/pull the data you require.\n2. Transfers initiated from elsewhere \u0026nbsp; When initiating a transfer from elsewhere you will transfer data files to/from a source machine (which may be inside or outside JASMIN) to the transfer server.\nTransfer directories \u0026nbsp; You will typically transfer data to/from a Group Workspace that you have been granted access to. If you are copying data from JASMIN you might want to copy data from the CEDA archive (mounted on JASMIN) to a remote site. You might also wish to copy small volumes of data to/from your $HOME directory. All of these locations are available on the transfer servers.\nJASMIN Transfer servers \u0026nbsp; JASMIN provides specific servers for managing data transfers. Please read about the different servers available for particular data transfer needs, and about the various data transfer tools available.\nImproving your transfer rates \u0026nbsp; To achieve better transfer rates, for large transfers or where speed and reliability are important, you are recommended to:\nuse the Globus data transfer service (recommended), or use the high-performance data transfer servers ( hpxfer access role required) use other parallel-capable transfer tools such as bbcp, lftp (parallel-capable ftp client), or gridftp: see Data transfer tools Transfer rates depend on many factors, so try to consider all of these:\ndo you really need to transfer some/all of the data? is the data in the CEDA Archive already (don\u0026rsquo;t copy it, if so, just process it in-place!) can your workflow deal with processing just smaller \u0026ldquo;chunks\u0026rdquo; at a time (streaming)? do you really need to have/keep all the source data, if it\u0026rsquo;s stored somewhere else? the network path all the way from where the source data resides, to the destination file system high-performance data transfer tools are great, but is the \u0026ldquo;last mile\u0026rdquo; over WiFi to your laptop? what is the length of the network path? If it\u0026rsquo;s international or intercontinental, SSH-based methods won\u0026rsquo;t work well. Consider Globus. the host at each end what sort of host is it (laptop, departmental server, virtual machine, physical machine) and what is its network connectivity? the file systems at each end not all file systems perform the same, for given types of data or transfer methods the size and number of files involved large numbers of small files can take a long time to transfer are the data in deep directory trees? These can take a long time to recreate on the destination file system consider creating a tar/zip archive to transfer fewer but larger files, or at least a method that copes well with many files in parallel or \u0026ldquo;in flight\u0026rdquo; at once. checking data integrity some methods will verify data integrity at source and destination to ensure integrity. This can be resource-heavy and slow. time of day would scheduling your transfer to happen at quieter times, mean that it completes more efficiently and/or without impacting others? Consider source and destination time zones!"
      })
      .add(
      
      
      {
        id: 27,
        tag: "en",
        href: "/docs/data-transfer/data-transfer-tools/",
        title: "Data Transfer Tools",
        description: "Data Transfer Tools",
        
        
        content: "This article lists the data transfer tools available on JASMIN and provides links to articles that describe them in more detail.\nData Transfer tools \u0026nbsp; The are many tools that you can use for transferring data to/from JASMIN. See the articles linked below for more details.\nTool Info Globus An efficient, secure data transfer service available to all JASMIN users (recommended). Includes capability to schedule, repeat and orchestrate transfers between third-party hosts and receive notifications of job status. Has web and command-line interfaces. Efficient for moving large volumes and/or numbers of files, especially over long distances. scp A basic transfer tool that works over the SSH protocol. Similar to \u0026ldquo;cp\u0026rdquo; but copies between remote servers. rsync (over SSH) Like scp but slightly more sophisticated. Allows synchronisation between remote directory trees. sftp SSH FTP - works over SSH. bbcp A command-line tool that allows the user to specify parallel transfer over multiple streams, using SSH authentication. GridFTP (over SSH) An old but comprehensive data transfer tool. Highly configurable and able to transfer over multiple parallel streams. Used over SSH in this case. Superceded by Globus GridFTP (certificate-based) As above, but using certificate-based authentication instead of SSH credentials. Efficient for moving large volumes and/or numbers of files, especially over long distances. Superceded by Globus FTP File Transfer Protocol. An aged transfer protocol suitable for small file transfers but limited. LFTP Parallel-capable FTP client. wget, curl Download tools for accessing resources over HTTP primarily. (see 3rd party documentation) sharing GWS data via http for exposing part(s) of a Group Workspace via HTTP to users without JASMIN accounts. Python transfer tools Methods of managing/scripting data transfer tasks using Python. You can use libraries such as requests in a Python 3 virtual environment on the transfer servers. MASS client (Met Office) A specific command-line tool installed on the mass-cli1.ceda.ac.uk server on JASMIN. Enables extractions from the Met Office MASS Archive directly on to OPeNDAP rclone A 3rd party, open-source command-line utility which can interface to, and synchronise data between, a wide variety of cloud and other storage backends, such as Google Drive and AWS S3 compatible object stores. It can also sync data over SSH. This utility is not installed on JASMIN but is well-documented and trivial for users to download and configure themselves on one of the data transfer servers) Please note install instructions, and dos and don\u0026rsquo;ts for rclone on JASMIN."
      })
      .add(
      
      
      {
        id: 28,
        tag: "en",
        href: "/docs/short-term-project-storage/elastic-tape-command-line-interface-hints/",
        title: "Elastic Tape command-line interface hints",
        description: "Elastic Tape command-line interface hints",
        
        
        content: "\u0026nbsp; Information below relates to the Elastic Tape command-line tools. The JDMA system provides a better interface for putting/retrieving data into the Elastic Tape System) A new system called NLDS is coming very shortly (as of Feb 2023) and will eventually replace both of these. This article explains the return codes of certain Elastic Tape (ET) commands.\net_put.py \u0026nbsp; Command-line tool to register large numbers of files for upload to Elastic Tape\nReturn codes \u0026nbsp; rc 0: normal exit rc 1: error in start up parameters rc 2: error processing list \u0026nbsp; When writing data to the ET system, it is very important that data remains in place on disk, in the location where ET expects to find them, until the status of the batch in question has reached CACHED_SYNCED or SYNCED. This means that the data have actually been written to tape, but is not the case until that status is shown.\nThe location where ET expects to find the files will be specified in the LISTFILE that the user supplied to the et_put.py command, or all files and directories under the DIR. The status of user\u0026rsquo;s batches can be checked by going to the webpage: http://et-monitor.fds.rl.ac.uk/et_user/ET_AlertWatch.php. You need to be logged into JASMIN to see this webpage, via the nx-login servers, and use Firefox as the web browser.\nDeleting the data from disk prematurely can cause problems for the ET system as a whole (impacting other users) so please be careful with this aspect.\net_get.py \u0026nbsp; Command-line tool to download large numbers of files from Elastic Tape\nReturn codes \u0026nbsp; 0: normal exit 1: error in start up parameters 2: cannot write to target directory 3: error received during download 4: closed by interrupt (^c probably) 5: completed with \u0026#34;bad files\u0026#34; (see list via stderr) et_rm.py \u0026nbsp; Command-line tool to delete files from Elastic Tape\nReturn codes \u0026nbsp; rc 0: normal exit rc 1: error in start up parameters rc 2: error processing list et_ls.py \u0026nbsp; Command-line tool for listing holdings in Elastic Tape\net_ls.py and grep \u0026nbsp; The first character on any data line is the line\u0026rsquo;s type. This allows a script to know the type of line it is trying to parse\nReturn codes \u0026nbsp; 0: normal exit 1: error in start up parameters or reading config file 2: requestor is not authorised for the intended workspace 4: closed by interrupt (^c probably) or as a result of a head/tail command et_transfer_mp \u0026nbsp; Return codes \u0026nbsp; 0: OK 1: config error 2: log directory error 3: already running 4: error creating client"
      })
      .add(
      
      
      {
        id: 29,
        tag: "en",
        href: "/docs/batch-computing/example-job-2-calc-md5s/",
        title: "Example Job 2: Calculating MD5 Checksums on many files",
        description: "Example Job 2: Calculating MD5 Checksums on many files",
        
        
        content: "This page records some early CEDA usage of the LOTUS cluster for various relatively simple tasks. Others may wish to use these examples as a starting point for developing their own workflows on LOTUS.\nCase 1: Calculating MD5 Checksums on many files \u0026nbsp; This is a simple case because:\nthe archive only needs to be read by the code and the code that we need to run involves only the basic linux commands so there are no issues with picking up dependencies from elsewhere. Case Description \u0026nbsp; we want to calculate the MD5 checksums of about 220,000 files. It will take a day or two to run them all in series. we have a text file that contains 220,000 lines - one file per line. Solution under LOTUS \u0026nbsp; Split the 220,000 lines into 22 files of 10,000 lines. Write a template script to: Read a text file full of file paths Run the md5sum command on each file and log the result. Write a script to create 22 new scripts (based on the template script), each of which takes one of the input files and works through it. And this is how it looks \u0026nbsp; Log in to the sci server (from a login server):\nssh -A \u0026lt;username\u0026gt;@sci1.jasmin.ac.uk Split the big file\nsplit -l 10000 -d file_list.txt Produces 22 files called \u0026#34;x00\u0026#34;...\u0026#34;x21\u0026#34; Create the template file: scan_files_template.sh\n#!/bin/bash #SBATCH -e %J.e infile=/home/users/astephen/sst_cci/to_scan/__INSERT_FILE__ while read f ; do /usr/bin/md5sum $f \u0026gt;\u0026gt; /home/users/astephen/sst_cci/output/scanned___INSERT_FILE__.log done \u0026lt; $infileRun a script to generate all the script files:\nfor i in `ls /home/users/astephen/sst_cci/to_scan/` ; do cp scan_files_template.txt bin/scan_files_$i.sh perl -p -i -w -e \u0026#39;s/__INSERT_FILE__/\u0026#39;$i\u0026#39;/g;\u0026#39; bin/scan_files_$i.sh doneSubmit all 22 jobs to LOTUS:\nfor i in `ls /home/users/astephen/sst_cci/to_scan/` ; do echo $i sbatch -p short-serial -o /home/users/astephen/sst_cci/output/$i /home/users/astephen/sst_cci/bin/scan_files_$i.sh doneWatch the jobs running:\nsqueue -u \u0026lt;username\u0026gt; And the result \u0026nbsp; All jobs ran within about an hour.\nCase 2: Checksumming CMIP5 Data \u0026nbsp; A variation on Case 2 has been used for checksumming datasets in the CMIP5 archive. The Python code below will find all NetCDF files in a DRS dataset and generate a checksums file and error log. Each dataset is submitted as a separate Slurm job.\n\u0026#34;\u0026#34;\u0026#34; Checksum a CMIP5 dataset usage: checksum_dataset.py dataset_id ... where dataset_id is a full drs id including version e.g. cmip5.output1.MOHC.HadGEM2-ES.historical.6hr.atmos.6hrLev.r1i1p1.v20110921 \u0026#34;\u0026#34;\u0026#34; import os import os.path as op import sys import optparse DRS_ROOT = \u0026#39;/badc/cmip5/data\u0026#39; def submit_job(dataset): # Assume version is in the dataset-id for now parts = dataset.split(\u0026#39;.\u0026#39;) path = op.join(DRS_ROOT, \u0026#39;/\u0026#39;.join(parts)) if not op.exists(path): raise Exception(\u0026#39;%s does not exist\u0026#39; % path) job_name = dataset cmd = (\u0026#39;sbatch -q short-serial -J job_name \u0026#39; \u0026#39;-o job_name.checksums -e job_name.err \u0026#39; \u0026#34;/usr/bin/md5sum \u0026#39;path/*/*.nc\u0026#39;\u0026#34;).format(job_name=job_name, path=path) print(cmd) os.system(cmd) def main(): parser = optparse.OptionParser(description=\u0026#39;Checksum DRS datasets\u0026#39;) (options, args) = parser.parse_args() datasets = args for dataset in datasets: submit_job(dataset) if __name__ == \u0026#39;__main__\u0026#39;: main()If you have a file containing a list of dataset ids you can submit each as a separate job by invoking the above script as follows:\n./checksum_dataset.py $(cat datasets_to_checksum.dat) sbatch -q short-serial -J cmip5.output1.MOHC.HadGEM2-ES.rcp85.day.seaIce.day.r1i1p1.v20111128 -o cmip5.output1.MOHC.HadGEM2-ES.rcp85.day.seaIce.day.r1i1p1.v20111128.checksums -e cmip5.output1.MOHC.HadGEM2-ES.rcp85.day.seaIce.day.r1i1p1.v20111128.err /usr/bin/md5sum \u0026#39;/badc/cmip5/data/cmip5/output1/MOHC/HadGEM2-ES/rcp85/day/seaIce/day/r1i1p1/v20111128/*/*.nc\u0026#39; Job \u0026lt;745307\u0026gt; is submitted to queue \u0026lt;lotus\u0026gt;. ..."
      })
      .add(
      
      
      {
        id: 30,
        tag: "en",
        href: "/training/advanced/training-exercises-coming-soon/",
        title: "Example training exercise",
        description: "Exercises to help you get the most out of JASMIN",
        
        
        content: "Watch this space \u0026nbsp; We\u0026rsquo;ll be adding more content soon, as we reorganise the JASMIN help content further.\nFor now, please see JASMIN Training Workshop materials\u0026nbsp; ."
      })
      .add(
      
      
      {
        id: 31,
        tag: "en",
        href: "/docs/mass/external-access-to-mass-faq/",
        title: "External Access to MASS FAQ",
        description: "External Access to MASS FAQ",
        
        
        content: "Introduction \u0026nbsp; The Managed Archive Storage System (MASS) provides storage and restore services for large volumes of Met Office data. It is a service operated by the UK Met Office.\nThis article provides answers to MASS frequently asked questions: Click on the link for each of the FAQs below to expand the answer.\nGeneral \u0026nbsp; Can I use my existing MASS account No. You need a separate MASS account for use on the Met Office internal network (CDN), Monsoon, ECMWF HPCs, and JASMIN. With these different account types, you can have permission to access different datasets specific to these computing environments. How do I use MOOSE? Please see the MOOSE User Guide here Will my account expire? Yes. By default, MASS via JASMIN accounts will expire after 500 days and your account will be automatically disabled.\nShortly before your account is due to expire you will receive an email, and it will contain instructions for you and your sponsor about how to extend your access. If your account has already expired and you are looking to reactive it, please email: Monsoon@metoffice.gov.uk\nWhy am I asked for a password when logging in to mass-cli? There are two reasons that may result in you being prompted for a password when attempting to login to the MASS client machine (mass-cli.jasmin.ac.uk).\nThe first is if you do not have permission to access the machine. A quick method to check is to verify if you are a member of the moose user group. It should be listed when you use the ‘groups’ command:\n[login1]$ groups mooseIf this happens, please contact: Monsoon@metoffice.gov.uk\nThe second is if you forget the -A option for agent forwarind when you ssh to a JASMIN login node. You can test for this condition by listing loaded identities on the login node, and finding you have none:\n[login1]$ ssh-add -l Could not open a connection to your authentication agent.If this happens, please exit back to your local machine and ssh in again using the -A flag or tick the relevant box for \u0026ldquo;agent forwarding\u0026rdquo;.\nHow can I directly login to the MASS client machine? You can\u0026rsquo;t, but you can edit your ssh configuration so that it automatically enables you to jump through the intermediary login servers.\nAdd the following to your home institute ssh config file ($HOME/.ssh/config file):\nHost mass-cli User your_jasmin_userid HostName mass-cli.jasmin.ac.uk ProxyCommand ssh -YA -t your_jasmin_userid@login1.jasmin.ac.uk -W %h:%p 2\u0026gt;/dev/nullYou should then be able to login directly using:\n$ ssh mass-cliPlease note that this only works if you are using OpenSSH version 5.4 or greater as earlier versions do not support the -W flag. You can check your version using: ssh -v\nCan I write to MASS from JASMIN? No, MASS access from JASMIN is strictly read-only. If you need to write to the MASS archive, contact monsoon@metoffice.gov.uk and ask to be put in touch with the relevant team. MOOSE messages and what to do \u0026nbsp; Is this process running in the correct environment? When running \u0026lsquo;moo install\u0026rsquo; you may get an error message similar to:\nCannot read file: /home/user/\u0026lt;userid\u0026gt;/.moosedir/moose - is this process running in the correct environment?This can be the result of the wrong combination of Unix user-id and UID having been used to encrypt the credentials file. If you encounter this error message, please type id on the command line whilst logged into JASMIN, and send the uid= section of the output to: Monsoon@metoffice.gov.uk\nYour credentials file will then be reissued.\nYour password is due to expire in X day(s). Occasionally on running a MOOSE command you will be told that your password is due to expire with a message of the form:\nYour password is due to expire in 6 day(s). A new password can be generated using 'moo passwd -r'. This refers specifically to your MASS via JASMIN, it does not affect any other MOOSE accounts you may have.\nYou need to run the command as advised in order to update your credentials whilst you are logged into mass-cli. You do not actually need to provide a new password, as this is generated and hidden from you by the command.\nIf you have a retrieval in progress, it is safe to run this command as it will not affect processes already running.\nERROR_SINGLE_COPY_UNAVAILABLE MOOSE - Single Copy Unavailable error\nOn occasion, a tape library needs to be taken down for maintenance. If a user is trying to retrieve a single-copy file stored on one of those tapes, the retrieval will temporarily fail with the message ERROR_SINGLE_COPY_UNAVAILABLE. As soon as the maintenance is completed, the file will be available again.\nTapes are taken out of MASS for copying to the new MASS system and become unavailable for roughly 14 days. The process is as follows:\nThursday (week one): Tapes are marked unavailable for indexing by the system. Tuesday (week two): Tapes get taken out for copying to the new MASS system. Following Thursday (week three): Tapes are returned to Met Office library and should be available again. So, if you find that data or files are unavailable due to the ERROR_SINGLE_COPY_UNAVAILABLE error, try reading the data again on Friday, and if still not available, try the following Friday when the migration should have completed.\nMOOSE basics \u0026nbsp; What is MOOSE? The software that allows you to interact with MASS. What is a project? A collection of access rules. What is an access rule? Permission to access an area in MASS. For example, project-random might have an access rule to moose:/crum/random-numbers\nBeing part of project-random would allow you to access the random-numbers set.\nHow do I see what projects I am a member of? You can use: moo prls How do I see what access rules a project has? You can use: moo projinfo -l projectname (Replace projectname with the name of one of your projects) How do I get access to a project, or add an access rule to one of my projects? Please contact your sponsor. They can then complete this form if they also agree you require access:\nhttps://metoffice.service-now.com/sp?id=sc_cat_item\u0026sys_id=5653331e1bbaf0d88ffa422ad34bcba0\u0026referrer=recent_items\nPlease note that the link above is only visible to those in the Met Office.\nWhy can I not access a set that I know is part of a project? If you are given access to a project but do not have access to all the sets associated with it, this can be due to the Access Control Lists (ACLs).\nThe project owner will be able to change the ACLs on sets to make them readable if it is appropriate.\nHow do I retrieve a file from MASS? Use moo get or moo select. More information about both commands is in the MOOSE User Guide. How do I make sure my directory has all the available data retrieved from MASS? The problem: You are running a model over a period of several days or weeks, and you need to analyse the output of the model as it runs. You have a moo get or moo select command that you run to fetch the data that is available. You want to be able to re-run it to fetch the files or fields that have been added to MASS since you last ran the command, but you do not want it to waste time re-fetching things you already have.\nThe solution: Use the -i or \u0026ndash;fill-gaps option when you run moo get or moo select. This option tells MOOSE that you only want to fetch files that don\u0026rsquo;t already exist in the specified local directory. Note that MASS works out where gaps are by doing checks to see if files of the expected name exist in your destination directory, so it won\u0026rsquo;t behave correctly if you rename files after you have retrieved them, or if you use the -C option with moo select which condenses all the matching fields into a single file.\nYou might also find the -g / --get-if-available option to moo get useful. This tells MOOSE to get every file from your moo get list that is available, but ignore ones that are not there rather than exit with an error. This could help if you are expecting files to be archived at some point but are not sure whether they will be there when your job runs. If you use this option MOOSE will get as much as it can from your list without bailing out.\nHow can I script my data retrieval from MASS? There are restrictions on how to login to JASMIN and use of Linux utilities such as ‘cron’ and ‘at’ but it is possible to remotely initiate a retrieval from MASS on to JASMIN, provided you have your ssh agent running on a machine local to you.\neval $(ssh-agent -s) ssh-add ~/.ssh/jasmin_id_rsa ssh -A -X sci1.jasmin.ac.uk \u0026#39;ssh mass-cli my_script.sh\u0026#39;If you have set up your $HOME/.ssh/config to allow more direct access, then the following should work:\nssh mass-cli my_script.shThis will run the script “my_script.sh” on the MASS client VM. You can put the moose retrieval commands into a script and it should work:\n#!/bin/bash SRC_URI=moose:/opfc/atm/global/SOMETHING moo get $SRC_URI jasmin_copy.pp exitIf you have access to an appropriate JASMIN workspace, then you can scp data from the workspace directly through one of the dedicated data transfer VMs. Again, you need the ssh-agent running locally:\neval $(ssh-agent -s) ssh-add ~/.ssh/jasmin_id_rsa scp userid@xfer1.jasmin.ac.uk:/group_workspaces/cems/\u0026lt;project\u0026gt;/jasmin_file.pp my_local_copy.pp Can I run MASS retrievals on LOTUS or through a workload manager? In addition to the interactive mass-cli server there is also the moose1 server that is only accessible through the\n\u0026lt;a href=\u0026quot;/docs/batch-computing/lotus-overview/\u0026quot;\u0026gt;LOTUS batch processing cluster\u0026lt;/a\u0026gt;. To submit jobs to moose1 you must use the [Slurm scheduler](https://help.jasmin.ac.uk/docs/batch-computing/slurm-scheduler-overview/). You will need to specify the account mass and partition mass, for example:\nsbatch -A mass -p mass [\u0026lt;options\u0026gt;] \u0026lt;jobscript\u0026gt;where \u0026lt;jobscript\u0026gt; looks something like:\n#!/bin/bash SRC_URI=moose:/opfc/atm/global/SOMETHING moo get $SRC_URI jasmin_copy.pp exitIt is also easy to configure the Rose/Cylc workflow manager to submit jobs to moose1 through the Slurm scheduler by including the following lines in your suite.rc file:\n[[[job submission]]] method = slurm [[[directives]]] --partition=mass --account=mass [\u0026lt;options\u0026gt;]"
      })
      .add(
      
      
      {
        id: 32,
        tag: "en",
        href: "/docs/data-transfer/ftp-and-lftp/",
        title: "ftp and lftp",
        description: "Data Transfer Tools: ftp and lftp",
        
        
        content: "This article provides information about FTP (File Transfer Protocol) as a data transfer tool. In particular:\nwhat is FTP? where and how can I use FTP on JASMIN? what are its limitations? What is FTP? \u0026nbsp; FTP is a well-established transfer protocol enabling connections from a client to download files from, or upload files to, a server, although limited in security. A wide variety of client tools are available to the user, 2 implementations of which are available on the JASMIN transfer servers, although no server is provided. ftp is also the name of the basic FTP client program, see below.\nWhere and how can I use FTP on JASMIN? \u0026nbsp; FTP can only be used as a client on JASMIN, to pull data from external FTP servers to local storage on JASMIN, for example a Group Workspace or your home directory. There is no FTP server within JASMIN providing the ability to upload files to these locations. Please use an alternative, more secure method instead. See other Data Transfer Tools such as scp/rsync/sftp, bbcp or GridFTP (over SSH, certificate-based or using Globus Online)\nOn the transfer servers, you can use one of the installed FTP clients to download data from elsewhere. These are:\nftp basic ftp client. Usage details lftp parallel-capable ftp client. Usage details CEDA however runs 2 FTP servers within the JASMIN environment providing download-only access to the CEDA archive. Access to these is controlled by your CEDA account and any dataset-specific privileges which are associated with that account.\nWhat are its limitations? \u0026nbsp; FTP was never designed as a secure protocol and has several limitations affecting how it can be used safely within an environment like JASMIN. Some external sites offer anonymous FTP download. In this case, no username or password needs to be exchanged and (as long as the data resources do not need to be protected in any way) this can provide a simple but effective data transfer method. Few external sites now provide FTP access to protected data resources, hence many data-intensive institutions are now focussing on more sophisticated data delivery methods which can meet the demands of security and performance in a multi-user environment. Basic client usage: ftp \u0026nbsp; The ftp client is available on the transfer servers xfer[123].jasmin.ac.uk\nExample 1: Downloading a file to a location on JASMIN from a remote FTP server.\nThis involves setting up an interactive client session. Once logged in (in this case, using anonymous FTP), you use FTP commands to interact with the remote server and locate and download the data you require. The session is terminated with bye.\nftp someserver.somesite.ac.uk Trying 123.456.78.123... Connected to someserver.somesite.ac.uk (123.456.78.123). 220---------------------------------------------------------------------------- 220-Welcome message from somesite.ac.uk 220---------------------------------------------------------------------------- 220 Name (123.456.78.123:username): anonymous 331 Please specify the password. Password: Once connected, the prompt changes to ftp\u0026gt;:\n230 Login successful. Remote system type is UNIX. Using binary mode to transfer files. cd /sites/pub/testdir/ (out)(out)250- 250-This is the somesite ftp repository. 250- 250 Directory successfully changed. get md5.sum local: md5.sum remote: md5.sum 227 Entering Passive Mode. 150 Opening BINARY mode data connection for md5.sum (45 bytes). 226 Transfer complete. 45 bytes received in 0.00267 secs (16.83 Kbytes/sec) bye 221 Goodbye. Full details of commands available within an interactive session with the ftp client are available via the man page (man ftp).\nParallel-capable client usage: lftp \u0026nbsp; The alternative client lftp is less verbose, but the basic workflow is the same.\nlftp someserver.somesite.ac.uk Once connected, the prompt changes to lftp and the name of the remote server:\ncd /sites/pub/testdir cd ok, cwd=/sites/pub/testdir/ get md5.sum 45 bytes transferred bye The interactive shell provided by lftp also benefits from tab completion and use of up/down arrows for command history.\nIn fact, lftp can also be used as an SFTP client, with the added benefit that it can handle multiple SFTP transfers in parallel.\nIn the following example, we connect to a remote SFTP server using the sftp:// syntax. Once logged in to the remote server, the prompt changes and you can enter lftp-specific commands like mirror, in this case with -P 4 as the option to use 4 sftp processes in parallel. Try other values but please consider other users so a suggested limit is 16.\nlftp sftp://username@someserver.somesite.ac.uk Password: (enter password when prompted) mirror -P 4 sourcedata bye Note that if you\u0026rsquo;re connecting to a JASMIN transfer server in this way, then you would need to make your JASMIN private key available in an ssh agent locally, and you would not be prompted for the password."
      })
      .add(
      
      
      {
        id: 33,
        tag: "en",
        href: "/docs/getting-started/generate-ssh-key-pair/",
        title: "Generate an SSH key pair",
        description: "Generate an SSH key pair",
        
        
        content: "This article explains how to create an SSH key pair for logging in to JASMIN.\nYou can also use this procedure to update an existing SSH key pair for JASMIN. However, if you are experiencing problems logging in to JASMIN you are advised to first check Login problems before changing your key. Once you have created your SSH key pair it will need to be uploaded to the JASMIN accounts portal. If this is the first time you have created a key pair then this will be done when you create an account on the portal (Step 2 of Get Started with JASMIN). If you are updating your key for an existing account then you will need to update it in your JASMIN profile.\nThe shell terminal \u0026nbsp; Generating an SSH key pair requires an SSH client and a Shell terminal. Linux and Mac users can use a standard terminal which is very likely to have SSH installed. Windows users are advised to install the MobaXterm application which provides a linux-style terminal with all the relevant utilities included. Figures 1 and 2 show example terminal windows on a Mac and Windows (using MobaXterm).\nMac terminal Terminal using Mobaxterm client on Windows Using ssh-keygen to create an SSH key pair \u0026nbsp; The Linux command ssh-keygen should be used to generate your SSH key pair. Open a terminal and generate your public and private key, as follows (replace the e-mail address with your own):\nssh-keygen -t rsa -b 2048 -C \u0026#34;me@somewhere.ac.uk\u0026#34; -f ~/.ssh/id_rsa_jasmin At the prompt, type a secure passphrase to protect your SSH private key. This is a requirement for access to JASMIN machines. Use a new, different passphrase whenever you generate a new key. Note that nothing is echoed to the screen when you enter your passphrase, so it may look like it is not working.\nThe output will look something like this: Generating public/private rsa key pair. Enter passphrase (empty for no passphrase): \u0026lt;ADD PASSPHRASE HERE\u0026gt; Enter same passphrase again: \u0026lt;REPEAT PASSPHRASE HERE\u0026gt; Your identification has been saved in /home/users/meuser/.ssh/id_rsa_jasmin. Your public key has been saved in /home/users/meuser/.ssh/id_rsa_jasmin.pub. The key fingerprint is: 74:14:95:8a:31:73:cc:5c:af:be:91:04:01:c2:39:0b me@somewhere.ac.uk Running ssh-keygen will generate two files in your $HOME/.ssh/ directory:\nid_rsa_jasmin - private key file (which should have permission \u0026ldquo;400\u0026rdquo;, i.e. readable only by you) id_rsa_jasmin.pub - public key file The public key file is the part that you need to share in order to access JASMIN. The private key file should be protected and not shared with others.\nConverting a PuTTYGen SSH private key for use with MobaXterm (Windows only) \u0026nbsp; If you have previously used the PuTTY utilities to login to JASMIN and you wish to move over to using MobaXterm then please see these instructions to convert your SSH private key from the PuTTYGen format to the OpenSSH format (as used by Linux/Mac). Please save your resulting OpenSSH key as id_rsa_jasmin in your $HOME/.ssh/ directory."
      })
      .add(
      
      
      {
        id: 34,
        tag: "en",
        href: "/docs/software-on-jasmin/geocat-replaces-ncl/",
        title: "Geocat replaces NCL",
        description: "GeoCat - replaces NCAR Command Language (NCL)",
        
        
        content: "Introduction \u0026nbsp; This article introduces geocat\u0026nbsp; as a replacement on JASMIN for NCAR Command Language (NCL) which is now deprecated.\nNCL now deprecated \u0026nbsp; NCL is now deprecated by NCAR (see this announcement), there is no Rocky 9 version available, so we will not be providing it when JASMIN moves from CentOS to using Rocky 9 in the next few months. The plan is to add to Jaspy the geocat-viz package, which is NCAR\u0026rsquo;s Python replacement for NCL.\nInstallation in a conda environment \u0026nbsp; To give you a chance now to familiarise yourself with geocat-viz, here are some instructions for how you could install it in a Conda environment under your own home directory.\n\u0026nbsp; Note that such an environment cannot be activated at the same time as Jaspy. Total disk space required is 3.2GB.\nCommands marked with #* below will be needed again in order to activate the environment in later sessions.\nDeactivate jaspy in this session:\nmodule unload jaspy #* Download miniforge installer:\nwget \u0026lt;https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh\u0026gt; Install base environment:\nbash Miniforge3-Linux-x86_64.sh Accept the default answers to the questions, saying no to the question about conda init.\nActivate the base environment:\nsource ~/miniforge3/bin/activate #* Create and activate an environment:\nmamba create -n my-geocat-env conda activate my-geocat-env #* Install the packages:\nmamba install geocat-viz geocat-datafiles Try one of the examples from:\nhttps://geocat-examples.readthedocs.io/en/latest/gallery/index.html\nwget https://geocat-examples.readthedocs.io/en/latest/_downloads/efafc109e5344e8e33052ad5213ee4be/NCL_box_1.py python NCL_box_1.py (should display a plot)\nFull documentation is at https://geocat-viz.readthedocs.io/en/latest/"
      })
      .add(
      
      
      {
        id: 35,
        tag: "en",
        href: "/docs/getting-started/get-jasmin-portal-account/",
        title: "Get a JASMIN portal account",
        description: "Get a JASMIN portal account",
        
        
        content: "This article explains how to register on the JASMIN accounts portal.\nHaving a JASMIN portal account does not by itself provide you with any access to JASMIN machines or services.\nJASMIN accounts portal \u0026nbsp; The JASMIN accounts portal is the place where you manage your JASMIN account and can apply for access to the many services which you may want to use on JASMIN.\nJASMIN accounts portal Apply for a new JASMIN account \u0026nbsp; To apply for a JASMIN account you need to use an email address affiliated with your academic institution. This is the preferred option — otherwise your email address may not be immediately approved. Then proceed as follows:\nStep 1 : On JASMIN accounts portal select \u0026ldquo;Apply for a new JASMIN account\u0026rdquo;. This will take you to the following page to enter your details.\nApplication details page Step 2 : Select your research discipline.\nResearch discipline Step 3 : Select the institution you are affiliated with. If your institution is not listed, you can add new institution details by clicking the plus button. Remember to provide supporting information to assess your eligibility for a JASMIN account and then submit your application.\nSelect institution Step 4 : After pressing Submit application, follow the URL link sent to your email address.\nEmail verification Step 5 : Once your email has been verified, you will receive a second email with a subject \u0026lsquo;Application approved\u0026rsquo; inviting you to complete the account creation. This link will take you to the following page where you have to choose your JASMIN account credentials, register your SSH public key and then click Create account:\nChoose credentials and add public key Step 6 : Agree to the JASMIN Terms and Conditions of Access:\nAccept terms of use Step 7 : Your JASMIN account is created and you can log in using your credentials:\nApplication complete"
      })
      .add(
      
      
      {
        id: 36,
        tag: "en",
        href: "/docs/getting-started/get-login-account/",
        title: "Get a login account",
        description: "Get a login account",
        
        
        content: "This article explains how to apply for access to the shared JASMIN servers.\nGet a login account \u0026nbsp; A user with a jasmin-login account is allocated a HOME directory of 100GB and can access the shared JASMIN servers (Scientific servers, data transfer servers) and the LOTUS batch cluster. Sign in into your JASMIN accounts portal where you can apply for a JASMIN login account representing the JASMIN access role appropriate to your affiliation.\nSign in Step 1: Select Login services and navigate to the \u0026lsquo;More information\u0026rsquo; on this service\nMore information Step 2: Apply for access to jasmin-login service\nApply for jasmin-login Step 3: Provide supporting information\nProvide supporting information Step 4: Your request is pending for approval\nRequest pending Step 4: Upon approval, a notification email is sent to you. Additionally, a notification counter in the bell will appear on the top left corner of the menu bar on your JASMIN account portal page. You have now access to the login server and to the scientific servers\nNotification Under \u0026lsquo;My Services\u0026rsquo; you can view all the services that you currently have access to or have requested access for. Note: Every time a notification is acknowledged the counter is reset or decremented.\nNow you can proceed to How to login"
      })
      .add(
      
      
      {
        id: 37,
        tag: "en",
        href: "/docs/getting-started/get-started-with-jasmin/",
        title: "Get Started with JASMIN",
        description: "Get Started with JASMIN",
        
        
        content: "This article explains the steps involved for most users to gain access to the JASMIN environment.\nThe JASMIN\u0026nbsp; scientific data analysis environment is administered by CEDA\u0026nbsp; and supports a wide variety of scientific workflows across environmental science domains.\nEssential steps \u0026nbsp; The steps listed in Table 1 (below) are required for scientific end-users to gain ssh access to the JASMIN login machines which are the \u0026ldquo;front door\u0026rdquo; for most users. Other services are available once these basic steps have been completed.\nAn overview of JASMIN compute \u0026amp; storage components is given in the presentation given at the JASMIN workshop - we strongly encourage all new users to watch this video recording and take a look at the accompanying exercises. These go into detail about all the basic things you may want to do with JASMIN.\nTable 1. Steps involved for a scientific end-user to gain login access to JASMIN. Click on the links under the \u0026lsquo;Details\u0026rsquo; column to find instructions for each step.\nStep Details Comments 1 Generate an SSH key Create this locally, ready to upload it to your JASMIN Account profile 2 Get a JASMIN portal account Access to JASMIN services is controlled by the JASMIN Accounts Portal - you must register for an account. Using this portal, you will then need to apply for access to the JASMIN services and privileges you require (as described in the steps below). Some of these services will require manual approval by individuals external to the CEDA/JASMIN team. Creating a JASMIN portal account does not by itself provide you with any access to JASMIN machines or services. You must complete all the steps below to gain full access. 3 Check network details Check details of your network connection to JASMIN to ensure you are able to connect. In order to maintain a secure and reliable scientific infrastructure for its users, JASMIN restricts login access by maintaining an \u0026ldquo;allow list\u0026rdquo; of network domains. 4 Request ssh login access to JASMIN Apply for the jasmin-login service, which will allow you to connect to JASMIN machines using ssh. 5 Apply for access to additional services on JASMIN JASMIN has a range of additional services, access to which is managed via the Accounts Portal. Search and apply for any services you require in the portal. In most cases, users will \u0026ldquo;belong\u0026rdquo; to a particular scientific project which may already have a presence on JASMIN, often in the form of a Group Workspace. See here how to Apply for access to a Group Workspace. 6 How to login Follow these steps for logging in to JASMIN via ssh, but we also have several other tutorials that may be useful - see Exercises 1-3 here. 7 Get a CEDA account The CEDA Archive provides access to thousands of atmospheric, climate change, and earth observation datasets. The Archive is directly accessible read-only throughout JASMIN. Some datasets on the CEDA Archive require specific agreements, and to apply for access to these, you will need a CEDA account. 8 Link your JASMIN and CEDA accounts The final step is to link your CEDA account to your JASMIN account. This allows you filesystem access to data on CEDA Archive. This is a step that you will be guided through in the JASMIN accounts portal. The table above describes the initial steps to get you started on JASMIN - however, there are a variety of ways that users can get the most out of JASMIN, that are not described in the table. Users are strongly encouraged to read further about JASMIN, and/or to discuss with scientific colleagues to gain an understanding of the resources available.\nThe documentation in this site is split into sections, based on different areas/services on JASMIN. You can navigate these sections in the menu on the left-hand side of your screen. A short description of each of these sections is below:\nGetting Started - this details all the steps needed to get started on JASMIN. Most documents are linked to from the table above, but there may be some other useful information there too. Interactive Computing - this introduces the resources on JASMIN available for interactive computing. This type of computing is the most common workflow on JASMIN for new users. LOTUS batch processing cluster - this introduces the available resources on JASMIN for batch computing. Software on JASMIN - Information on running software packages within JASMIN Data Transfer - this category includes guidance on transferring data to and from JASMIN. MASS - JASMIN has Read-only access to the Met Office MASS storage archive. This section explains how to get access. Short-term project storage - this section introduces the concept of shared Group Workspaces and the different storage types on JASMIN. Group Workspaces (GWSs) are portions of disk allocated for particular projects to manage themselves, enabling collaborating scientists to share network accessible storage on JASMIN. Long-term archive storage - this section describes the long-term CEDA Archive which consists of thousands of atmospheric, climate change, and earth observation datasets. This is directly accessible as a file system from the shared science machines on JASMIN. For Cloud Tenants - JASMIN also provides a cloud computing service, this section describes this. Workflow management - this category details the various tools available for managing your workflow. The CEDA team also regularly hosts training workshops and events. Details about past and future events can be found on the events section of the CEDA website."
      })
      .add(
      
      
      {
        id: 38,
        tag: "en",
        href: "/docs/data-transfer/globus-command-line-interface/",
        title: "Globus Command-Line Interface",
        description: "Data Transfer Tools: Using the Globus Command-Line Interface",
        
        
        content: "\u0026nbsp; Updated for new JASMIN Default Collection (replaces previous JASMIN Globus Endpoint) Please read Globus transfers with JASMIN first for a wider introduction to Globus on JASMIN.\nThis article describes\nhow to transfer data using the Globus Command Line Interface. It covers: how an end-user can set up their host (laptop, desktop or home directory on their departmental server) with the Globus Command-Line Interface (CLI) examples of common tasks using the CLI It is not necessary to use the Globus CLI on a JASMIN server: it is a tool that you can use anywhere (for example your own desktop/laptop) to interact with the Globus service, to orchestrate a transfer between 2 endpoints (collections, in new Globus terminology). The CLI is not centrally installed on JASMIN, and does not need to be in the same place as either of the 2 collections involved in the transfer. You could use the CLI on your own laptop/desktop, even if the 2 collections were 2 institutional Globus collections on opposite sides of the world. You could of course decide to install the CLI in your home directory on JASMIN if that were useful as part of your processing/data transfer workflow.\nThe Globus CLI is fully documented here with examples. It provides a command-line interface for managed transfers via the Globus cloud-based transfer service, which usually achieves the best possible transfer rate over a given route compared to other methods. Typically this will be significantly faster than can be achieved over scp, rsync or sftp transfers, particularly if the physical network path is long.\nThe Globus CLI is designed for use either interactively within an interactive shell or in scripts. An alternative Python software development kit (SDK) is also available and should be considered for more sophisticated workflows.\nAlternatively, the Globus web interface at https://app.globus.org can be used as an easy-to-use interface to orchestrate transfers interactively.\nWhichever method is used: CLI, SDK or web interface, transfers are invoked as asynchronous, managed tasks which can then be monitored, and if need be set to retry automatically until some pre-set deadline.\nPrerequisites \u0026nbsp; Linux environment with normal user privileges, or Mac environment with ability to install applications, or Windows environment with ability to install applications Python environment for that platform, with ability to create virtual environments (to enable installation of additional packages) For use of the JASMIN Default Collection: An active JASMIN user account, with “jasmin-login” role You may also wish to set up your own Globus endpoint using Globus Connect Personal, though this is not needed for these examples. Initial Setup \u0026nbsp; Get a Globus identity \u0026nbsp; Go to https://app.globus.org and either:\nchoose one of the listed identity providers (e.g. GitHub, Google, \u0026hellip;) follow the link at the bottom to \u0026ldquo;use Globus ID to sign in\u0026rdquo; See also https://docs.globus.org/how-to/get-started/\nSet up the Globus CLI on your machine \u0026nbsp; Do the following on your own (local) machine. Make a Python virtual environment and activate it:\npython3 -m venv ./venv source ./venv/bin/activate Download the Globus CLI and install it into the virtual environment ( venv).\npip install globus-cli Try the globus login command. The first time you run this, you will be prompted to authorise the Globus CLI to carry out operations on behalf of your Globus ID. The URL will open in your default browser, where you should authenticate with your Globus ID credentials. If you prefer, you can copy/paste the URL from the command-line to a browser of your choice. Either way, you then need to click \u0026ldquo;Allow\u0026rdquo; in the browser window, then copy/paste the resulting \u0026ldquo;Native App Authorization Code\u0026rdquo; back to the terminal window where you issued the globus login command:\nglobus login --no-local-server Please authenticate with Globus here: ------------------------------------ https://auth.globus.org/v2/oauth2/authorize?client_id=abc1234-9c3c-4ad42-be31-8d6c87101239014\u0026amp;redirect_uri=https%3A%2F%2Fauth.globus.org%2Fv2%2Fweb%2Fauth-code\u0026amp;scope=openid+profile+email+urn%3Aglobus%3Aauth%3Ascope%3Aauth.globus.org%3Aview_identity_set+urn%3Aglobus%3Aauth%3Ascope%3Atransfer.api.globus.org%3Aall+urn%3Aglobus%3Aauth%3Ascope%3Agroups.api.globus.org%3Aall+urn%3Aglobus%3Aauth%3Ascope%3Asearch.api.globus.org%3Aall\u0026amp;state=_default\u0026amp;response_type=code\u0026amp;access_type=offline\u0026amp;prompt=login ------------------------------------ Enter the resulting Authorization Code here: You should then see the following:\nYou have successfully logged in to the Globus CLI! You can check your primary identity with globus whoami For information on which of your identities are in session use globus session show Logout of the Globus CLI with globus logout You can now use the Globus CLI commands as listed by the following command:\nglobus --help Usage: globus [OPTIONS] COMMAND [ARGS]... Interact with Globus from the command line All `globus` subcommands support `--help` documentation. Use `globus login` to get started! The documentation is also online at https://docs.globus.org/cli/ Options: -v, --verbose Control level of output -h, --help Show this message and exit. -F, --format [unix|json|text] Output format for stdout. Defaults to text --jmespath, --jq TEXT A JMESPath expression to apply to json output. Takes precedence over any specified \u0026#39; --format\u0026#39; and forces the format to be json processed by this expression --map-http-status TEXT Map HTTP statuses to any of these exit codes: 0,1,50-99. e.g. \u0026#34;404=50,403=51\u0026#34; Commands: bookmark Manage endpoint bookmarks collection Manage your Collections delete Submit a delete task (asynchronous) endpoint Manage Globus endpoint definitions get-identities Lookup Globus Auth Identities group Manage Globus Groups list-commands List all CLI Commands login Log into Globus to get credentials for the Globus CLI logout Logout of the Globus CLI ls List endpoint directory contents mkdir Create a directory on an endpoint rename Rename a file or directory on an endpoint rm Delete a single path; wait for it to complete search Use Globus Search to store and query for data session Manage your CLI auth session task Manage asynchronous tasks transfer Submit a transfer task (asynchronous) update Update the Globus CLI to its latest version version Show the version and exit whoami Show the currently logged-in identity Examples \u0026nbsp; Find an endpoint (aka collection) We will use the globus endpoint search subcommand. Find help on the particular options for that with\nglobus endpoint search --help Usage: globus endpoint search [OPTIONS] [FILTER_FULLTEXT] Search for Globus endpoints with search filters. If --filter-scope is set to the default of \u0026#39;all\u0026#39;, then FILTER_FULLTEXT is required. If FILTER_FULLTEXT is given, endpoints which have attributes (display name, legacy name, description, organization, department, keywords) that match the search text will be returned. The result size limit is 100 endpoints. Options: --filter-scope [all|administered-by-me|my-endpoints|my-gcp-endpoints|recently-used|in-use|shared-by-me|shared-with-me] The set of endpoints to search over. [default: all] --filter-owner-id TEXT Filter search results to endpoints owned by a specific identity. Can be the Identity ID, or the Identity Username, as in \u0026#34;go@globusid.org\u0026#34; --limit INTEGER RANGE The maximum number of results to return. [default: 25; 1\u0026lt;=x\u0026lt;=1000] -v, --verbose Control level of output -h, --help Show this message and exit. -F, --format [unix|json|text] Output format for stdout. Defaults to text --jmespath, --jq TEXT A JMESPath expression to apply to json output. Takes precedence over any specified \u0026#39;--format\u0026#39; and forces the format to be json processed by this expression --map-http-status TEXT Map HTTP statuses to any of these exit codes: 0,1,50-99. e.g. \u0026#34;404=50,403=51\u0026#34; Search for the collections matching the search term \u0026ldquo;tutorial\u0026rdquo;:\nglobus endpoint search \u0026#34;tutorial\u0026#34; ID | Owner | Display Name ------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------- 6c54cade-bde5-45c1-bdea-f4bd71dba2cc | 6df1b656-c953-40a3-91a9-e9e8ad5173ea@clients.auth.globus.org | Globus Tutorial Collection 1 31ce9ba0-176d-45a5-add3-f37d233ba47d | 6df1b656-c953-40a3-91a9-e9e8ad5173ea@clients.auth.globus.org | Globus Tutorial Collection 2 The 2 globus tutorial collections actually \u0026ldquo;see\u0026rdquo; the same filesystem, so we\u0026rsquo;ll just use the first one.\nFor convenience, let\u0026rsquo;s set environment variables representing the ID of this collection:\nexport c1=6c54cade-bde5-45c1-bdea-f4bd71dba2cc echo $c1 6c54cade-bde5-45c1-bdea-f4bd71dba2cc Let\u0026rsquo;s try listing that collection, so that we know we can interact with it. We are prompted to grant consent first: globus ls $c1 The collection you are trying to access data on requires you to grant consent for the Globus CLI to access it. Please run: globus session consent \u0026#39;urn:globus:auth:scope:transfer.api.globus.org:all[*https://auth.globus.org/scopes/6c54cade-bde5-45c1-bdea-f4bd71dba2cc/data_access]\u0026#39; to login with the required scopes. Copy \u0026amp; paste the command it gives you (don\u0026rsquo;t copy the one above) and run it, which should open a web browser window. Follow the instructions which should complete the process, then return to your terminal session.\nNow let\u0026rsquo;s find another collection, this time a public test collection which can be used for performance testing:\nglobus endpoint search \u0026#34;star dtn\u0026#34; ID | Owner | Display Name ------------------------------------ | ------------------ | ------------------------------------------------- ff2ee779-54fb-4dac-ade2-57568c587ae3 | esnet@globusid.org | ESnet STAR DTN private collection ece400da-0182-4777-91d6-27a1808f8371 | esnet@globusid.org | ESnet Starlight DTN (Anonymous read only testing) e9e0d9f4-c419-44e0-8198-017fd61bf0c4 | esnet@globusid.org | ESnet Starlight DTN (read-write testing) We\u0026rsquo;ll use the one labelled Anonymous read only testing. Set stardtn to the ID of this endpoint:\nexport stardtn=ece400da-0182-4777-91d6-27a1808f8371 \u0026nbsp; None of the endpoints mentioned so far require authentication in order to use them. This makes demonstrating basic functionality simpler, but we\u0026rsquo;ll look at how to use one that does, later. Listing files at a path on an collection Use the endpoint ls command to list the contents of the stardtn endpoint, at the path /\nglobus ls $stardtn:/ 500GB-in-large-files/ 50GB-in-medium-files/ 5GB-in-small-files/ 5MB-in-tiny-files/ Climate-Huge/ Climate-Large/ Climate-Medium/ Climate-Small/ bebop/ logs/ write-testing/ 100G.dat 100M.dat 10G.dat 10M.dat 1G.dat 1M.dat 500G.dat 50G.dat 50M.dat These are files and directories containing dummy data which can be used for test purposes.\nCopy a file from one endpoint to another Let\u0026rsquo;s transfer the file 1M.dat from the stardtn endpoint to c1:\nglobus transfer $stardtn:/1M.dat $c1:/~/1M.dat Message: The transfer has been accepted and a task has been created and queued for execution Task ID: 74cb181c-bf63-11ee-a90e-032e06ca0965 The transfer task is a separate activity and does not require any connection from the CLI client to either of the 2 endpoints: the Globus transfer service manages the transfer for us. We can check on the progress of this transfer task with:\nglobus task show 74cb181c-bf63-11ee-a90e-032e06ca0965 Label: None Task ID: 74cb181c-bf63-11ee-a90e-032e06ca0965 Is Paused: False Type: TRANSFER Directories: 0 Files: 1 Status: SUCCEEDED Request Time: 2024-01-30T11:33:58+00:00 Faults: 0 Total Subtasks: 2 Subtasks Succeeded: 2 Subtasks Pending: 0 Subtasks Retrying: 0 Subtasks Failed: 0 Subtasks Canceled: 0 Subtasks Expired: 0 Subtasks with Skipped Errors: 0 Completion Time: 2024-01-30T11:34:01+00:00 Source Endpoint: ESnet Starlight DTN (Anonymous read only testing) Source Endpoint ID: ece400da-0182-4777-91d6-27a1808f8371 Destination Endpoint: Globus Tutorial Collection 1 Destination Endpoint ID: 6c54cade-bde5-45c1-bdea-f4bd71dba2cc Bytes Transferred: 1000000 Bytes Per Second: 421388 We can also list the destination collection to check that the file has reached its destination:\nglobus ls $c1:/~/ 1M.dat We can also make a subdirectory with mkdir: globus mkdir $c1:/~/mydata/ The directory was created successfully We can move our 1M.dat into that directory with a globus rename command globus rename $c1 /~/1M.dat /~/mydata/1M.dat File or directory renamed successfully We now have a directory mydata containing files 1M.dat:\nglobus ls $c1:/~/mydata/ 1M.dat Recursively copy a directory and its contents, from one endpoint to another Now Let\u0026rsquo;s copy a directory from the stardtn collection which contains some small files, to our destination endpoint c1 (The Globus tutorial collections only provide very limited storage space).\nThe files we want to copy are at the path /5MB-in-tiny-files/a/a/ on the stardtn endpoint, and are small, as their names suggest:\nglobus ls $stardtn:/5MB-in-tiny-files/a/a/ a-a-1KB.dat a-a-2KB.dat a-a-5KB.dat Copy the parent directory recursively to ep1:\nglobus transfer -r $stardtn:/5MB-in-tiny-files/a/a $c1:/~/star-data Message: The transfer has been accepted and a task has been created and queued for execution Task ID: 4ae9bab0-7d40-11ec-bef3-a18800fa5978 Check destination content:\nglobus ls $c1 mydata1/ star-data/ globus ls $c1:/~/star-data a-a-1KB.dat a-a-2KB.dat a-a-5KB.dat We could now delete one of the small files using the globus delete command: globus delete $c1:/~/star-data/a-a-2KB.dat Message: The delete has been accepted and a task has been created and queued for execution Task ID: be4d6934-7d40-11ec-891f-939ceb6dfaf1 And list contents again, to verify that it has been deleted:\nglobus ls $c1:/~/star-data a-a-1KB.dat a-a-5KB.dat Sync a source directory to a target (repeatable) We could now repeat the copying of the source data, but this time using the -s or --sync-level exists command so that we only copy the data that is now missing from the destination. The full set of sync options is [exists|size|mtime|checksum].\nglobus transfer -s exists -r $stardtn:/5MB-in-tiny-files/a/a $c1:/~/star-data Message: The transfer has been accepted and a task has been created and queued for execution Task ID: 759a3cac-7d41-11ec-bef3-a18800fa5978 This should only copy the data that do not already exist at the desination: We end up with the same set of files at the destination:\nglobus ls $c1:/~/star-data a-a-1KB.dat a-a-2KB.dat a-a-5KB.dat But we can see that only 2000 bytes were transferred (so we know it only copied that one file, which is what we wanted):\nglobus task show 759a3cac-7d41-11ec-bef3-a18800fa5978 Label: None Task ID: 759a3cac-7d41-11ec-bef3-a18800fa5978 Is Paused: False Type: TRANSFER Directories: 1 Files: 3 Status: SUCCEEDED Request Time: 2022-01-24T18:14:24+00:00 Faults: 0 Total Subtasks: 5 Subtasks Succeeded: 5 Subtasks Pending: 0 Subtasks Retrying: 0 Subtasks Failed: 0 Subtasks Canceled: 0 Subtasks Expired: 0 Subtasks with Skipped Errors: 0 Completion Time: 2022-01-24T18:14:58+00:00 Source Endpoint: ESnet Starlight DTN (Anonymous read only testing) Source Endpoint ID: ece400da-0182-4777-91d6-27a1808f8371 Destination Endpoint: Globus Tutorial Collection 1 Destination Endpoint ID: 6c54cade-bde5-45c1-bdea-f4bd71dba2cc Bytes Transferred: 2000 Bytes Per Second: 60 This task could be repeated in a shell script, cron job or even using the Globus timer functionality, for either a source or destination directory that is expected to change.\nInteract with a collection that requires authentication Most Globus Connect Server endpoints are configured to require some form of authentication \u0026amp; authorization process. In the case of the JASMIN Default Collection, you link your Globus identity to your JASMIN identity. This may be different for other collections that you use elsewhere.\nLet\u0026rsquo;s find, then set up an alias to the JASMIN Default Collection Endpoint. We can search for that name:\nglobus endpoint search \u0026#34;jasmin default\u0026#34; ID | Owner | Display Name ------------------------------------ | ------------------------------------------------------------ | ------------------------- a2f53b7f-1b4e-4dce-9b7c-349ae760fee0 | a77928d3-f601-40bb-b497-2a31092f8878@clients.auth.globus.org | JASMIN Default Collection Set up an alias for this collection:\nexport jdc=a2f53b7f-1b4e-4dce-9b7c-349ae760fee0 If you\u0026rsquo;ve already interacted with this collection recently, you should find that you can list it with the CLI already. If not, you will be prompted to authenticate. Follow through all the steps until you complete the process, then return to the terminal session.\nIf successful, you can now interact with the JASMIN endpoint, for example listing your home directory:\nglobus ls $jdc:/~/ ... (file listing of your JASMIN home directory) ... The authentication via your JASMIN account lasts for 30 days, so you can run and re-run transfers during that period without needing to repeat the process (hence without any human interaction, if you have scheduled/automated transfers, see below).\nIf this needs to be renewed, then:\nthe simple way to do this is to either:\n(manually) visit the Globus web interface and access the JASMIN Default Collection again (manuall) use the CLI to list the collection again In either case, if the authentication has timed out, you will be prompted to follow instructions to renew it, then the action (listing the directory) should complete successfully.\nThere are ways to do use a \u0026ldquo;refresh token\u0026rdquo; programatically to renew the authentication. Watch this space for details of how to do that (or f)\nAutomation \u0026nbsp; The functionality demonstrated above can be combined into scripts which can perform useful, repeatable tasks such as:\nrecursively syncing the contents of directories between 2 endpoints Globus provide 2 implementations of this here:\nExamples of automation using the Globus CLI, specifically:\ncli-sync.sh : bash script using the Globus CLI as demonstrated above globus_folder_sync.py : Python code using the Globus Python Software Development Kit (SDK) We have not covered the Python SDK here, but this is a useful example of how you could integrate Globus transfer functionality into your own code and workflows. You would need to install and authorise this SDK first.\nTaking the first of these examples, we can adapt it slightly:\n1. Select the JASMIN endpoint at the destination, and set the destination path. Modify the corresponding variables in the script to these values:\nDESTINATION_COLLECTION=\u0026#39;a2f53b7f-1b4e-4dce-9b7c-349ae760fee0\u0026#39; #JASMIN Default Collection ID DESTINATION_PATH=\u0026#39;/home/users/\u0026lt;username\u0026gt;/sync-demo/\u0026#39; #replace \u0026lt;username\u0026gt; with your JASMIN username \u0026nbsp; For STFC users only where the other collection in the transfer is within the STFC network, an additional collection is provided \u0026ldquo;JASMIN STFC Internal Collection\u0026rdquo; and has ID 9efc947f-5212-4b5f-8c9d-47b93ae676b7. 2. If you haven\u0026rsquo;t already, activate the Python virtual environment where you have the CLI installed, and login:\nsource ~/.globus-cli-venv/bin/activate globus login 3. Check that you can interact with the JASMIN collection from the CLI, by trying to list it\nFollow any instructions needed, if you need to renew your authentication.\n4. Run the script to sync the data from the Globus Tutorial Endpoint to the destination directory.\nYou should see output similar to that shown below.\n./cli-sync.sh Checking for a previous transfer Last transfer f5db7238-8f06-11ec-8fe0-dfc5b31adbac SUCCEEDED, continuing Verified that source is a directory Submitted sync from 6c54cade-bde5-45c1-bdea-f4bd71dba2cc:/share/godata/ to a2f53b7f-1b4e-4dce-9b7c-349ae760fee0:/~/sync-demo/ Link: https://app.globus.org/activity/04e277f4-8f07-11ec-811e-493dd0cf73a1/overview Saving sync transfer ID to last-transfer-id.txt 5. Check on the status of the task. You could do this by\nfollowing the URL to https://app.globus.org to view the task under \u0026ldquo;activities\u0026rdquo;, or globus task show \u0026lt;taskid\u0026gt; 6. You could then make some change to either source or destination directory, and simply re-run the script\n./cli-sync.sh 7. Experiment by changing the SYNCTYPE. Other options are:\nSee here for descriptions of the available sync levels:\nEXISTS SIZE MTYPE CHECKSUM 8. Automating repeats of the sync operation\nYou could then consider how to repeat the task automatically. For example:\ntriggering a re-run of the cli-sync.sh command according to some condition that\u0026rsquo;s met in your workflow. scheduling the running of the cli-sync.sh command on your own machine using cron on your own machine. Remember: the invocation of the command does NOT need to be done on JASMIN, it can be done wherever you have the CLI installed, for example your local machine. use the web interface (go to \u0026ldquo;Transfer \u0026amp; Timer Options\u0026rdquo;) to configure repeating tasks initiated there. Learn about how to use timers with Globus: these can be set up using the web interface or using an additional CLI globus-timer-cli which can be installed into the same virtualenv as the main globus cli. Learn about Globus Flows to create fully automated workflows. Globus have created a number of pre-canned workflow actions (e.g. \u0026ldquo;make directory\u0026rdquo;, \u0026ldquo;transfer\u0026rdquo;, \u0026ldquo;delete\u0026rdquo;, ..) which you can chain together in your own workflow, or combine with your own to create custom workflows. A useful example might be: watching a directory for arrival/creation of a certain file triggering a compute/analysis step on files in the directory (using a Globus Compute endpoint of your own?) transferring the output of that analysis to elsewhere, and cleaning up"
      })
      .add(
      
      
      {
        id: 39,
        tag: "en",
        href: "/docs/data-transfer/globus-connect-personal/",
        title: "Globus Connect Personal",
        description: "Globus Connect Personal",
        
        
        content: "Introduction \u0026nbsp; This article describes how to create your own Globus collection using Globus Connect Personal.\nPlease read Globus transfers with JASMIN first for a wider introduction to Globus.\nUsing Globus Connect Personal (GCP)\u0026nbsp; would enable you to transfer files to/from another Globus collection using any of the Globus Online transfer tools (Web app, CLI or Python SDK).\nThe term \u0026ldquo;endpoint\u0026rdquo; has changed meaning with version 5 of Globus, so users now interact with \u0026ldquo;collections\u0026rdquo;. but see Endpoints vs Collections\u0026nbsp; for a fuller explanation of these entities.\nFor example, if you set up GCP on your desktop/laptop, you could transfer data files to/from your home directory or other storage on JASMIN.\n\u0026nbsp; You may not need to do this if your institution already has a Globus endpoint available to you. You should NOT install this on a JASMIN server, as a Globus endpoint is already provided for you. If you plan to install it in your user area on your departmental server, check with your local IT administrator whether that\u0026rsquo;s an OK thing to do. Point them at the relevant Globus documentation but note that you should be able to do the install with regular/user privileges and that the software does not usually need to be left running: it can be started for the duration of any data transfer tasks, then stopped once they have completed. Set up Globus Connect Personal on end-user machine \u0026nbsp; Installers are available for Linux, Mac and Windows operating systems:\nLinux (command-line) https://docs.globus.org/how-to/globus-connect-personal-linux/#globus-connect-personal-cli Mac https://docs.globus.org/how-to/globus-connect-personal-mac/ Windows https://docs.globus.org/how-to/globus-connect-personal-windows/ The instructions below show the process for Linux (command-line):\nThese commands should be executed on YOUR OWN MACHINE (not JASMIN):\nwget https://downloads.globus.org/globus-connect-personal/linux/stable/globusconnectpersonal-latest.tgz tar xzf globusconnectpersonal-latest.tgz This will produce a versioned globusconnectpersonal directory Replace x.y.z in the line below with the version number you see\ncd globusconnectpersonal-x.y.z ./globusconnectpersonal (see links above for details of how to install without the graphical user interface, if you need to)\nComplete the installation using the setup key. If a graphical environment is detected, a window will appear, to guide you through the steps. If not, text prompts will appear.\n(Please see the relevant installation guide for your platform, linked above, for further details)\nStart Globus Connect Personal (Linux) \u0026nbsp; ./globusconnectpersonal -start If you use the web application at https://app.globus.org, you should now be able to see your GCP endpoint listed under \u0026ldquo;Collections\u0026rdquo; when you filter by \u0026ldquo;Administered by you\u0026rdquo;. You can now try listing the files on it and perhaps transferring a file to/from one of the Globus Tutorial endpoints using the web interface.\nThe setup process will have prompted you for a name for your endpoint. It is assigned a unique ID, too.\nIf you have the Globus Command-Line Interface installed (see here), you can find the ID of your own endpoint with the CLI command:\nglobus endpoint search \u0026lt;name\u0026gt; --filter-owner-id \u0026lt;your globus id\u0026gt; If successful, you should now be able to interact with your endpoint via any of the Globus tools (web app, CLI and Python SDK).\nFor example, you could list the files on the endpoint:\nglobus ls \u0026lt;endpoint_id\u0026gt;:\u0026lt;path\u0026gt; Set directory permissions \u0026nbsp; Don\u0026rsquo;t forget to configure which directory paths on your system can be accessed by GCP. By default these may NOT be accessible, so you need to allow access.\nWindows: GCP icon in taskbar, then Options / Access Mac: menu bar icon / Preferences / Access Linux: by editing the config file ~/.globusonline/lta/config-paths, see here\u0026nbsp; for syntax."
      })
      .add(
      
      
      {
        id: 40,
        tag: "en",
        href: "/docs/data-transfer/globus-transfers-with-jasmin/",
        title: "Globus transfers with JASMIN",
        description: "Globus transfers with JASMIN",
        
        
        content: "This article describes how to do data transfers using JASMIN\u0026rsquo;s new Globus endpoint (now called a collection ), based on the most recent version of Globus Connect Server.\nJASMIN\u0026rsquo;s old Globus endpoint, based on the previous version of the Globus service, ceased operating on 18 December 2023 as support was discontinued by Globus. We have implemented a new endpoint, based on Globus Connect Server v5.4, with equivalent (but better!) functionality.\nThe new collection can be used as a drop-in replacement for the previous endpoint, aside from a few differences in terminology, and a change to the authentication process.\nMain differences \u0026nbsp; There are some differences to how the new (v5) version of Globus works on JASMIN compared to previously:\nUsers now interact with a collection Most users: please use \u0026ldquo;JASMIN Default Collection\u0026rdquo; with ID a2f53b7f-1b4e-4dce-9b7c-349ae760fee0 For STFC users only where the other collection (either GCP or GCS\u0026nbsp; ) is within STFC, an additional collection is provided \u0026ldquo;JASMIN STFC Internal Collection\u0026rdquo; and has ID 9efc947f-5212-4b5f-8c9d-47b93ae676b7. You now use the JASMIN Accounts Portal to authenticate (using your JASMIN account credentials) via OpenID Connect (OIDC). During the authentication process, you are redirected to the JASMIN Accounts Portal to link your Globus identity with your JASMIN account. Consent needs to be granted at a number of points in the process to allow the Globus service to carry out actions on your behalf. The default lifetime of the authentication granted to your JASMIN account is now 30 days. After this, you may need to refresh the consent for your \u0026ldquo;session\u0026rdquo;. This service is now available to all users of JASMIN: you no longer need to hold the hpxfer access role. The following examples show you how to authenticate with the new JASMIN Default Collection and list the contents of your home directory. As before, however, the following file systems are available via this collection\nFile system Access $HOME (/home/users/\u0026lt;username\u0026gt;) Read-write /gws (group workspaces) Read-write /work/xfc (transfer cache) Read-write /badc (CEDA Archive) /neodc Read-only List your home directory using the web app \u0026nbsp; 1. Navigate to https://app.globus.org\n2. Log in with your Globus identity (this could be a globusid.org or other identity)\nlog in 3. In File Manager, use the search tool to search for \u0026ldquo;JASMIN Default Collection\u0026rdquo;. Select it.\nFind JASMIN Default Collection 4. In the transfer pane, you are told that Authentication/Consent is required. Click Continue.\nConsent 5. Click the link to use the JASMIN Accounts Portal OIDC server to link your JASMIN identity\n6. You are taken to a page on the JASMIN Accounts portal, where you are invited to \u0026ldquo;Authorise\u0026rdquo; the external application to authenticate and access your essential account information.\nAuthorise application 7. If successful, you are taken back to the Globus web app, where you are invited to \u0026ldquo;Allow\u0026rdquo; the app to use the listed information and services.\nAllow the app to use the info 8. The directory listing of your home directory should now appear in the transfer pane.\n9. Try navigating to another collection known to you (previously known as endpoint) in the other pane and transferring some data. If you have Globus Connect Personal running locally, you should be able to transfer files to/from that.\nList your home directory using the command-line interface (CLI) \u0026nbsp; 1. Load the virtual environment where you have the Globus CLI installed:\n(in this example, a Python virtual environment named ~/.globus-cli-venv already exists. If it doesn\u0026rsquo;t create one with the command python3 -m venv ~/.globus-cli-venv on your local machine). Activate this virtual environment as follows:\nsource ~/.globus-cli-venv/bin/activate 2. It\u0026rsquo;s recommended to update to the latest version of the CLI by doing the following:\npip install -U globus-cli 3. Check that you have an active globus session and follow any instructions given, e.g.\nglobus login globus session show 4. Use the \u0026ldquo;globus ls\u0026rdquo; command to list the collection using its ID, starting at the path of your home directory (/~/)\nglobus ls a2f53b7f-1b4e-4dce-9b7c-349ae760fee0:/~/ TIP: you can set the ID of the collection to be an environment variable like this, for convenience:\nexport JASMIN_GLOBUS=a2f53b7f-1b4e-4dce-9b7c-349ae760fee0 globus ls $JASMIN_GLOBUS:/~/ 6. You will be taken through an equivalent set of steps to those needed for the web app. First off, you will be asked to copy/paste a URL into your browser and copy/paste back the resulting authentication code.\n7. Once the authentication/consent process has been completed, you should see a listing of your home directory.\n8. Use the globus transfer command to copy data to/from another collection (previously known as endpoint) to your home directory, within the JASMIN Default Collection. (see globus transfer --help for details)"
      })
      .add(
      
      
      {
        id: 41,
        tag: "en",
        href: "/docs/interactive-computing/graphical-linux-desktop-access-using-nx/",
        title: "Graphical linux desktop using NoMachine NX",
        description: "Graphical linux desktop using NoMachine NX",
        
        
        content: "This article explains how to connect to a graphical linux desktop within the JASMIN environment using NoMachine NX.\nIntroduction \u0026nbsp; Benefits \u0026nbsp; This service provides a graphical Linux desktop on JASMIN, ideal for use with graphics-heavy tasks like interactive work with large images. The desktop environment includes a Firefox web browser which can be used to access internal-only web resources. Using graphical applications over a wide-area network can be very slow, and is not recommended or supported on JASMIN. This service provides a better alternative with graphical desktop within the JASMIN environment itself, rather than on the user\u0026rsquo;s local machine.\nA small client application, available for you to install on your local machine, enables you to connect to specific servers within JASMIN. Graphics are then relayed to the client application in a more efficient form, resulting in much better performance particularly if you need to interact with what\u0026rsquo;s being displayed.\nThe service provides an improved user experience and is strongly recommended over standard X11 graphics.\nThe following \u0026ldquo;special\u0026rdquo; login servers have the NX service available and can be used as described below:\nnx-login1.jasmin.ac.uk (best for use from university networks) nx-login2.jasmin.ac.uk (Contingency config similar to login2.jasmin.ac.uk, to make it available from clients without reverse DNS lookup to a domain in the JASMIN allow-list. Use this option if you need to connect from home and do not have an institutional VPN available) nx-login3.jasmin.ac.uk (Contingency config as above) nx-login4.jasmin.ac.uk (Contingency config as above, but also supports users with usernames \u0026gt; 8 but also supports users with usernames \u0026gt; 8 characters. No support for usernames \u0026gt; 14 characters: contact helpdesk for advice) Notes \u0026nbsp; In all other respects these are the same as the standard login servers, but should only be used with the NX enterprise client as described below, (other than for testing your connection) as this preserves system resources for their intended purpose. Although the graphical desktop session which you create with this service should persist when you close the client (unless you specifically log out), you should not rely on this feature, so please don\u0026rsquo;t report this as a problem: occasionally machines run out of resources and sessions get killed. Keeping sessions open consumes resources on the server even when you\u0026rsquo;re not using the session, which may mean that other users can\u0026rsquo;t use the service. nx-login4 has been introduced to help cater for users whose usernames exceed 8 characters length. This works around a known limitation in the NX server software but may not solve the problem for users with very long names (created before we introduced a limit to prevent this happening: if this still affects you and you cannot make onward connections to other machines in NX, please contact the helpdesk) Installing NoMachine Enterprise Client \u0026nbsp; Download the appropriate version of the NoMachine Enterprise Client from [NoMachine](https://www.nomachine.com/download-enterprise#NoMachine- Enterprise-Client). This page contains links to several different products. The only one you need to install is \u0026ldquo;NoMachine Enterprise Client\u0026rdquo;.\nVersions are available for Windows, Mac and Linux. You may need privileges on your local machine in order to install the software so you may need to ask for help from your local IT helpdesk.\nNote that \u0026ldquo;Nomachine Enterprise Client\u0026rdquo; is a different application to the \u0026ldquo;Nomachine Enterprise Desktop\u0026rdquo; available from the more publicised download link on the NoMachine website or other applications in the NoMachine suite: the desktop edition contains additional components to enable remote access to your own (local) machine from a remote location: perhaps convenient but not what we are trying to enable for you here.\nThe NoMachine Enterprise Client is purely a client to connect to a remote server: in our case the server is at the JASMIN end, where the desktop session will exist.\nRemember to check for updates for the enterprise client to ensure you always have the latest stable version. You can configure the application to check for updates (and optionally apply them automatically) by going to Settings / Updates in the menu.\nSetting up your connection \u0026nbsp; As you can see from the following videos, the instruction steps below are very similar for Windows / Mac / Linux, once the enterprise client is installed. Note that the interface may look slightly different depending on which version number of the client you have installed (we can\u0026rsquo;t promise to keep the videos up to date with every new version, unfortunately!)\nWindows Mac Linux Instructions for v8.x clients: (older clients may vary but same concept overall)\nOpen the NX client\nOn Mac and Windows, click the NoMachine Icon On Linux, the default location for the executable once installed is /usr/NX/bin/nxplayer, so you may want to add this to your path. Your desktop environment may enable you to add an icon to your desktop. In the \u0026ldquo;Machines\u0026rdquo; view, select \u0026ldquo;Add\u0026rdquo;\nYou\u0026rsquo;re now in the \u0026ldquo;Address\u0026rdquo; tab. Type a name for this connection profile, and the full hostname, e.g. nx-login2.jasmin.ac.uk. Set the Protocol to \u0026ldquo;SSH\u0026rdquo;, which will change the port to 22. Go to the \u0026ldquo;Configuration\u0026rdquo; tab.\nChoose \u0026ldquo;Use key-based authentication with a key you provide\u0026rdquo; , then click the Modify button to the right. The default is \u0026ldquo;Use password authentication\u0026rdquo;: don\u0026rsquo;t use this. Use the button to the right to navigate to your private key, or type the path in the box. Your private key may be in a hidden directory e.g. ~/.ssh (see Troubleshooting) It is recommended NOT to \u0026ldquo;import the private key to the connection file\u0026rdquo;. Make sure you tick the box \u0026ldquo;Forward Authentication\u0026rdquo; IMPORTANT Go back to the \u0026ldquo;Add connection\u0026rdquo; dialog\nIf all is correct, click \u0026ldquo;Add\u0026rdquo; In the \u0026ldquo;Machines\u0026rdquo; list\nYou should see your new connection listed. Either double-click it, or right-click and select \u0026ldquo;Start connection\u0026rdquo; (Note that you can right-click to Edit/Remove/Rename or see Troubleshooting ) Connecting \u0026nbsp; Enter your JASMIN username and your SSH passphrase (it is NOT recommended to save your passphrase in the connection file). Click OK.\nYou may see a list of all the other desktop sessions currently in progress from other users. Ignore these and click \u0026ldquo;New desktop\u0026rdquo;.\nSelect \u0026ldquo;Create a new virtual desktop\u0026rdquo;, then click \u0026ldquo;Create\u0026rdquo;\nNote the instructions for how to reach the NX menu once in the session, and select screen settings from the list of icons: Recommended setting is \u0026ldquo;Fit to window\u0026rdquo; (leftmost icon)\nClick OK on this and subsequent screens giving information about the NX and desktop environments.\nYou should be presented with a linux deskop on the server to which you connected, e.g. nx-login2.jasmin.ac.uk\nClick \u0026ldquo;Activities\u0026rdquo; (top left menu on desktop) Open a terminal window by clicking the \u0026ldquo;Terminal\u0026rdquo; icon in the menu down the left hand side.\nTo see the list of sci servers which is normally presented at login (which helps in selected a less-loaded sci server), type the following:\ncat /etc/motd Using the graphical desktop environment \u0026nbsp; Once you have set up the environment to your liking, you can\nuse the web browser on that system to access web-based resources available only within JASMIN make SSH connections to other systems within JASMIN such as sci1.jasmin.ac.uk use graphical applications on other systems within JASMIN and send the output bask to this desktop Click \u0026ldquo;Activities\u0026rdquo; (top left menu on desktop) click Activities Click the Firefox icon in the side bar menu to start the Firefox web browser. Use this to access web-based resources only available within JASMIN. Do not use for personal web browsing. To toggle Firefox between taking up the whole of your desktop, and running in a smaller, sizeable window, double-click its title bar (this applies to any windowed application on the desktop). open Firefox browser Click the Terminal icon open Terminal application Try an onward SSH connection, for example to a SCI machine. ssh -AX \u0026lt;user\u0026gt;@sci1.jasmin.ac.uk (where \u0026lt;user\u0026gt; should be replaced by your JASMIN username).\nWork interactively on a SCI machine as you would normally, but any graphical tools/applications should now work efficiently.\n(Example of a graphical application on another machine within JASMIN). Try opening a simple graphical application on sci1.jasmin.ac.uk with the command:\nxclock (you may find -AY works if -AX does not).\nYou may also get a few warning messages like this, which can safely be ignored:\nWarning: Missing charsets in String to FontSet conversionCancel the graphical application (xclock) with CTRL + c, or use the application\u0026rsquo;s own exit command, if it has one.\nWith other graphical applications opened on other servers within JASMIN, you may get warning/error messages like these as they start up: these can safely be ignored. Sometimes an application window can take a few seconds to appear, but should work normally after that.\nFailed to open connection to \u0026#34;session\u0026#34; message bus: /usr/bin/dbus-launch terminated abnormally without any error message Running without a11y support! Gtk-Message: 08:58:38.169: Failed to load module \u0026#34;pk-gtk-module\u0026#34; Gtk-Message: 08:58:38.171: Failed to load module \u0026#34;canberra-gtk-module\u0026#34;\u0026lt;br\u0026gt; To log out of the virtual desktop, locate the menu top-right, and select your name, then \u0026ldquo;Log Out\u0026rdquo; 1. Don\u0026rsquo;t worry if it appears that you\u0026rsquo;re able to power off the machine with other users logged in: you would need administratrive privileges for this (which you don\u0026rsquo;t have) so you can\u0026rsquo;t do this accidentally. Please don\u0026rsquo;t try, however! Notes \u0026nbsp; The number of \u0026ldquo;virtual desktops\u0026rdquo; which can be created per user is limited to 1 in order to preserve system resources. Although in theory sessions and desktop windows should persist when you close down the NoMachine client and when you re-open it to the same connection, you should not rely on this feature. Keeping long-running sessions open reduces resources available to other users. The option to shut down the machine does not work for a \u0026ldquo;regular\u0026rdquo; user (only admins). Please just \u0026ldquo;Log out\u0026rdquo; instead. Troubleshooting \u0026nbsp; Authentication error (Windows users) \u0026nbsp; Try reformatting your private key using a tool available within MobaXterm. If you have tested and can successfully connect to nx-login2.jasmin.ac.uk from a MobaXterm terminal but NOT from the NoMachine NX client (\u0026ldquo;Authentication Failed\u0026rdquo;), then try following the steps below: these instructions are for Windows users. Note that this doesn\u0026rsquo;t make you a new key, it just makes a newly-formatted version of your key, which can sit alongside your existing private key file. The public key stays the same, so there\u0026rsquo;s no need to upload anything new to your JASMIN profile. Open the MobaKeyGen tool: MobaXterm menu / Tools / MobaKeyGen (SSH Key Generator) Click Load, navigate to your existing private key file (you may need to change the filter to show all files (.) instead of just (*.ppk). Select your key, click Open You will be prompted for the passphrase which you set when creating the key. In the MobaKeyGen menu, select Conversions / Export OpenSSH key (the 2nd option) Choose a new name for the file (it is recommended to just append something on to the end of your existing key name, so that it\u0026rsquo;s clear that they are formats of the same key, e.g. id_rsa_jasmin -\u0026gt; id_rsa_jasmin_f (but the name is not significant). Close the \u0026ldquo;MobaXterm SSH Key Generator\u0026rdquo; window Make yourself a new NX connection profile, pointing to the new file You should now be able to connect. The following video shows this sequence in action (although the key is named slightly differently) Transposed symbol keys \u0026nbsp; After the first connection (particularly for Mac users), subsequent connections to the same connection profile sometimes have some symbols keys e.g. @ and \u0026quot; transposed.\nWatch the following video for how to correct this.\nDoing as shown leaves a small drop-down choice tool in your Gnome desktop menu so that you can correct the problem if it re-occurs later. The correct choice for the author\u0026rsquo;s UK Mac was \u0026ldquo;English (UK, Macintosh)\u0026rdquo;, but you may need to experiment with the choices available to match your own keyboard layout.\nIf you click the small keyboard-layout icon (bottom right when viewing the list of choices), you will be shown a preview of that keyboard layout to compare with your own.\nConnection timeout \u0026nbsp; Please do not try and connect using the proprietary \u0026ldquo;NX\u0026rdquo; protocol. Select \u0026ldquo;SSH\u0026rdquo; as the protocol. If you mistakenly use \u0026ldquo;NX\u0026rdquo; as the protocol you may see an error similar to the following when you try to connect (The correct port for SSH connections is 22)\nA connection timeout has occurred while trying to connect to \u0026#39;nx-login2.jasmin.ac.uk\u0026#39; on port \u0026#39;4000\u0026#39;. The issue could either be caused by a networking problem, by a firewall or NAT blocking incoming traffic or by a wrong server address. Please verify your configuration and try again. Authentication method \u0026nbsp; Please use \u0026ldquo;Private key\u0026rdquo; as the authentication method, not \u0026ldquo;Authentication agent\u0026rdquo;, as the former has been found to work more consistently and reliably, particularly for onward connections to other machines.\nClient version \u0026nbsp; Make sure you have installed and are using the most recent version of the NoMachine Enterprise Client (not the NoMachine Enterprise Desktop or any other applications from NoMachine).\nKey format \u0026nbsp; If you created your SSH private key using the \u0026ldquo;PuTTYgen\u0026rdquo; application, and are getting \u0026ldquo;Authentication failed\u0026rdquo; for a key pair that you know works OK for simple terminal connections, it could be that you need to convert the private key to \u0026ldquo;OpenSSH format\u0026rdquo; for use here. By doing this you would be creating an alternately-formatted version of the same private key, so the public key stays the same (and you don\u0026rsquo;t need to re-upload that to JASMIN).\nOpen PuTTYgen and \u0026ldquo;Load an existing private key file\u0026rdquo; (click \u0026ldquo;Load\u0026rdquo;) Ignore the notice about saving it in PuTTY\u0026rsquo;s own format (this is not useful here) (click \u0026ldquo;OK\u0026rdquo;) In the PuTTYgen menu, select \u0026ldquo;Conversions\u0026rdquo;, then \u0026ldquo;Export OpenSSH key\u0026rdquo; Save the newly-formatted private key file locally. The passphrase needed to unlock it should not have changed. Use this newly-formatted key file with NoMachine NX. Passphrase vs Password \u0026nbsp; Be sure to use the PASSPHRASE associated with your SSH private key, and not the PASSWORD associated with your JASMIN account, when prompted using the NX client.\nCan\u0026rsquo;t find your private key? \u0026nbsp; The location of your private key on your local machine may be in a hidden directory for example ~/.ssh. In order to navigate to it to provide the location when setting up your connection profile, you may need to enable the display of hidden directories/files in your local desktop environment first. On a Mac you can do this with the shortcut CMD\u0026#43;SHIFT\u0026#43;. . In Windows this is under File Explorer / View / Hidden Items. It\u0026rsquo;s also possible that your home directory itself (normally /Users/\u0026lt;username\u0026gt;) is not configured to be displayed by default in Finder. If this is case, go to Finder / Preferences / Sidebar / Show these items and tick the box next to the item representing your username: this should make it appear, and .ssh should be a subdirectory of this.\nCan\u0026rsquo;t make an onward connection \u0026nbsp; Previous versions of the Windows client had problems with \u0026ldquo;forward authentication\u0026rdquo; enabled, but this is required for onward connection to other machines. If this happens, try:\nDoes your username have \u0026gt; 8 characters? If so, try using nx-login4. Uninstalling the v7 client client Deleting the C:\\Users\\\u0026lt;username\u0026gt;\\.nx directory on your machine Re-installing and trying again. Deleting and making a new connection profile for the nx-login server you\u0026rsquo;re connecting to. Can\u0026rsquo;t display graphics from sci machine or other onward connection \u0026nbsp; Did you omit the -X option from the SSH command when you made the onward connection to that machine? Try -Y if -X doesn\u0026rsquo;t work for you.\nDisk space \u0026nbsp; Check your disk usage in your JASMIN home directory: if this is over the 100G limit, you may not be able to write any temporary files and this could prevent NoMachine from being able to start a new session or even reconnect to an existing virtual desktop session. Clear out some space and re-check with pdu -sh $HOME to find out how much space you\u0026rsquo;re using.\nCan\u0026rsquo;t connect or gets stuck connecting to a previous session \u0026nbsp; Sometimes, you can\u0026rsquo;t connect because you have a previous session which did not terminate correectly, or you might have problems reconnecting to a previous desktop session. Sometimes the client will get stuck with a \u0026ldquo;spinning wheel\u0026rdquo; before eventually timing out. You can terminate your own previous session as follows:\nFollow instructions in Connecting until step 2 where all the users\u0026rsquo; sessions on the machine are displayed. Find the one corresponding to your username Right-click it and select \u0026ldquo;Terminate session\u0026rdquo; Note that you may lose any unsaved work in the session that you terminate, but it should clear the stuck session and allow you to reconnect. Please try this first before asking the support team, as this is the first thing that they will try in order to clear your session.\n\u0026ldquo;It worked yesterday\u0026rdquo; \u0026nbsp; For occasions where \u0026ldquo;it worked last time I tried to connect, but now doesn\u0026rsquo;t\u0026rdquo;, please first try the above step to clear any previous session which might have got stuck, otherwise the time-honoured IT support advice of \u0026ldquo;turning it off and on again\u0026rdquo; is applicable: try restarting your local machine where the NX client is running, as this can sometimes clear issues with the client, your machine or your network connection. Don\u0026rsquo;t forget to re-connect via your VPN if available."
      })
      .add(
      
      
      {
        id: 42,
        tag: "en",
        href: "/docs/data-transfer/gridftp-cert-based-auth/",
        title: "GridFTP (certificate-based authentication)",
        description: "Data Transfer Tool: GridFTP (certificate-based authentication)",
        
        
        content: "This article describes how to transfer data using gridftp with certificate- based authentication.\n\u0026nbsp; The globus-url-copy command used here should not be confused with the Globus online data transfer service. They used to be associated, but no longer. If you are starting out and looking for a reliable, high-performance transfer method, the recommendation now is to learn about Globus Transfers with JASMIN (using the Globus online data transfer service) instead of command-line gridftp as described in this document. Basics of certificate-based authentication \u0026nbsp; Gridftp servers commonly use a network of \u0026ldquo;trust\u0026rdquo; based on electronic certificates. In order to make use of a gridftp server at one end of your proposed transfer, you will need to use a certificate which identifies you as the user, and which is issued by an identity provider which is \u0026ldquo;trusted\u0026rdquo; by the servers at both ends. The trust between the servers is maintained by the administrators of the service who will ensure that the necessary certificates are in place.\nThe presentation of a valid credential which is trusted by the server at the other end is merely the authentication step (proving who you are). Authorisation also needs to follow: you, as a user (identified by the credential you present) need to be authorised to use the resource at the other end. You should check with the operator of the other gridftp server to see what additional steps are required before you can actually perform a transfer.\nGetting a short-term credential \u0026nbsp; In order to access the JASMIN gridftp server, you can now use your JASMIN portal account to gain a short-term credential which the server will recognise to authenticate you. This is the same username and password you would use to log in to https://accounts.jasmin.ac.uk to administer your JASMIN account. IT IS NOT YOUR SSH PASSPHRASE.\nHere\u0026rsquo;s what to do:\nDownload tools to interact with JASMIN\u0026rsquo;s Online Certificate Authority (OnlineCA). You can use these to interact with other OnlineCAs too (not just JASMIN\u0026rsquo;s. These replace the \u0026ldquo;myproxy-logon\u0026rdquo; tool previously mentioned here) Use these tools to: 1. \u0026ldquo;Bootstrap trust\u0026rdquo; i.e. to setup your local certificate store with those needed to interact with the JASMIN server [First time use only] 2. Obtain a short-term credential using your JASMIN account details [First time, and to renew your short-term credendial as needed] Use this short-term credential to authenticate with a remote gridftp server which trusts this credential (for example, the JASMIN gridftp server) Download OnlineCA tools \u0026nbsp; On the machine you intend to use as the transfer client, e.g. xfer1.jasmin.ac.uk, in your JASMIN home directory, download 2 shell scripts which will interact with the Online CA for you. Make them executable:\nwget https://raw.githubusercontent.com/cedadev/online_ca_client/master/contrail/security/onlineca/client/sh/onlineca-get-cert-wget.sh wget https://raw.githubusercontent.com/cedadev/online_ca_client/master/contrail/security/onlineca/client/sh/onlineca-get-trustroots-wget.sh chmod u+x onlineca-get-*.sh View help information for the shell scripts:\n./onlineca-get-trustroots-wget.sh -h ./onlineca-get-cert-wget.sh -h Bootstrap trust between your own machine and the JASMIN gridftp server: (First time only)\n./onlineca-get-trustroots-wget.sh -U https://slcs.jasmin.ac.uk/trustroots/ -b Bootstrapping Short-Lived Credential Service root of trust. Trust roots have been installed in /home/users/USERNAME/.globus/certificates. Obtain a credential, to be written to an output file credfile using your JAMSIN Accounts Portal username USERNAME:\n./onlineca-get-cert-wget.sh -U https://slcs.jasmin.ac.uk/certificate/ -l USERNAME -o ./cred.jasmin When prompted, enter the password associated with your JASMIN account (NOT your SSH passphrase)\nChange the permissions on your newly-created cred.jasmin file so that it\u0026rsquo;s only readable by you (client software may insist on this):\nchmod 600 ./cred.jasmin This credential obtained by this method is valid by default for 720 hours (30 days), as you can see by inspecting the certificate using the following command:\nopenssl x509 -in cred.jasmin -noout -startdate -enddate notBefore=Mar 11 17:32:59 2022 GMT notAfter=Apr 10 17:32:59 2022 GMT After the notAfter date, it will no longer be valid, but you can repeat this process at any time (e.g. before it expires) to update it.\nExample Gridftp usage \u0026nbsp; (General case, or with a JASMIN host as gridftp client)\nOnce you have obtained a valid short-term credential on the client transfer server, and assuming that the gridftp server at the remote end of the transfer recognises and is able to authorize you via this credential, then you should be able to transfer data between the remote server and local client with commands such as shown below:\nPlease consult the documentation for the globus-url-copy command for the full range of options and arguments.\nPlease note that the examples below use a fictitious client gridftp-client.localsite.ac.uk and server gridftp-server.remotesite.ac.uk which need to be replaced in your commands with the hostname of the actual gridftp server and client you are actually using.\nCheck help documentation for the globus-url-copy command:\nglobus-url-copy -help NOTE: On some systems, you have to load a relevant module to get access to the globus-url-copy command, however not on the JASMIN [hp]xfer servers.\nIt is recommended to try things out using the regular xfer servers xfer[12] but to perform \u0026ldquo;real\u0026rdquo; transfers using hpxfer[12] for better performance, but to use the latter you will need the hpxfer access role.\n1. Remote directory listing issued by client on gridftp- client.localsite.ac.uk to server gridftp-server.remotesite.ac.uk where you have a home directory /home/users/USERNAME:\nglobus-url-copy -cred cred.jasmin -vb -list gsiftp://gridftp-server.remotesite.ac.uk/home/users/USERNAME/ 2. Download a file from remote directory /home/users/USERNAME to destination on the client machine:\nglobus-url-copy -cred cred.jasmin -vb gsiftp://gridftp-server.remotesite.ac.uk/home/users/USERNAME/myfile file:///path/to/localdir/myfile The -p N and -fast options can additionally be used in combination to enable N parallel streams at once, as shown below. You can experiment with N in the range 4 to 16 to obtain the best performance, but please be aware that many parallel transfers can draw heavily on shared resources and degrade performance for other users:\nglobus-url-copy -cred cred.jasmin -vb -p 16 -fast gsiftp://gridftp-server.remotesite.ac.uk/home/users/USERNAME/myfile file:///path/to/localdir/myfile 3. Recursively download the contents of a directory on a remote location to a local destination.\nglobus-url-copy -cred cred.jasmin -vb -p 4 -fast -cc 4 -cd -r gsiftp://gridftp-server.remotesite.ac.uk/home/users/USERNAME/mydir/ file:///path/to/localdir/mydir/ Where:\n-cc N requests N concurrent transfers (in this case, each with p=4 parallel streams) -cd requests creation of the destination directory if this does not already exist -r denotes recursive transfer of directories -sync and -sync-level options can be used to synchronise data between the two locations, where destination files do not exist or differ - y criteria that can be selected) from corresponding source files. See -help option for details. the file:/// URI is used to specify the destination on the local file system. Uploading data \u0026nbsp; The above commands can also be adapted to invoke transfers from a local source to a remote destination, i.e. uploading data, since the commands all take the following general form:\nglobus-url-copy [OPTIONS] source-uri desination-uri You can use the above examples by replacing the local machine gridftp-client.localsite.ac.uk with one of the jasmin transfer hosts xfer[12].jasmin.ac.uk as a client, To do this, you first need to be logged in via SSH to one of these hosts and can initiate a transfer by invoking globus-url-copy in one of the ways above.\nFor high-performance transfer (large volumes and/or longer distances), use hpxfer[12].jasmin.ac.uk for which you will need to have the hpxfer access role. hpxfer[12].jasmin.ac.uk are also recommended for transfers to/from ARCHER2 if initiated at the JASMIN end, but if you are initiating the transfer from the ARCHER2 end, you will need to connect to the JASMIN GridFTP server as described below, see also Transfers from ARCHER2. hpxfer2.jasmin.ac.uk is tuned for very long path transfers (e.g. Western US or Australia/NZ) For remote hosts using JASMIN\u0026rsquo;s dedicated network link (Met Office only) use xfer[12].jasmin.ac.uk as the client (These are virtual machines so have limited performance, but your transfer will be over a dedicated network connection) Connecting to the JASMIN GridFTP server \u0026nbsp; In order to do a transfer using a JASMIN host as the gridftp server (rather than client), you would need to interact with the JASMIN GridFTP server gridftp1.jasmin.ac.uk. You cannot log in to this server directly via SSH: you only initiate GridFTP transfers to and from it from another client.\nIn the following example, a client is initiated on a fictitious remote host client.remotesite.ac.uk and tests the connection by transferring from /dev/zero on the local machine (at remotesite ) to /dev/null on the JASMIN gridftp server. Note that you can use the SLCS server at JASMIN to obtain the short-term credential required ( but the first time, you will need to download and use the OnlineCA tools as described above ). You can renew your credential and perform the test transfer as follows:\n./onlineca-get-cert-wget.sh -U https://slcs.jasmin.ac.uk/certificate/ -l USERNAME -o ./cred.jasmin globus-url-copy -cred cred.jasmin -vb -p 8 -fast /dev/zero gsiftp://gridftp1.jasmin.ac.uk/dev/null Source: file:///dev/ Dest: gsiftp://gridftp1.jasmin.ac.uk/dev/ zero -\u0026gt; null 4153409536 bytes 792.20 MB/sec avg 792.20 MB/sec inst This server is also used as the JASMIN GridFTP Server globus endpoint, see GridFTP transfers using Globus Online (however you can only currently use your CEDA SLCSs credential with Globus Online. The JASMIN team is working on a solution for this).\nPlease note that the servers xfer[12].jasmin.ac.uk and hpxfer[12].ceda.ac.uk are not gridftp servers. They have the globus- url-copy client installed, so can be used as clients to connect to remote gridftp servers, and also support gridftp over SSH (both incoming and outgoing), but do not act as servers for certificate-based gridftp as shown in these examples. The JASMIN gridftp server for read-write access to home directories and group workspaces is gridftp1.jasmin.ac.uk. Access to this requires the hpxfer access role. See also Transfer Servers.\nThird-party transfers \u0026nbsp; It should be possible, with the correct configuration at each site, to initiate on host A a transfer of data between two other gridftp servers B and C (a third party transfer). Both URIs would use gsiftp: as the protocol:\nglobus-url-copy -vb -p 4 gsiftp://B/source gsiftp://C/destination Further information can be found in the documentation for globus-url-copy.\nThis is the basis of the Globus Online managed service to orchestrate and monitor transfers between gridftp endpoints in a more user-friendly way. It has evolved considerably since diverging from the \u0026ldquo;traditional\u0026rdquo; gridftp setup described in this article and is recommended as it provides a much easier user experience and better reliability.\nSee Globus transfers with JASMIN.\nFuture plans \u0026nbsp; As [support for the open-source Globus Toolkit (including globus-url-copy) has now been withdrawn by Globus](https://www.globus.org/blog/support-open-source- globus-toolkit-ends-january-2018), the future of direct gridftp transfers is uncertain. It is currently maintained by the Grid Community Forum.\nWe advise users to spend some time understanding and testing transfer workflows with the Globus Online transfer service, including the command-Line, web interfaces and (for advanced users) a Python SDK, as these are likely to replace direct gridftp on JASMIN in due course."
      })
      .add(
      
      
      {
        id: 43,
        tag: "en",
        href: "/docs/data-transfer/gridftp-ssh-auth/",
        title: "GridFTP (SSH authentication)",
        description: "Data Transfer Tools: GridFTP (SSH authentication)",
        
        
        content: "This article describes how to transfer data using GridFTP with SSH authentication.\n\u0026nbsp; The globus-url-copy command used here should not be confused with the Globus online data transfer service. They used to be associated, but no longer. If you are starting out and looking for a reliable, high-performance transfer method, the recommendation now is to learn about Globus Transfers with JASMIN (using the Globus online data transfer service) instead of command-line gridftp as described in this document. Introduction \u0026nbsp; GridFTP is the recommended tool for transferring large files or groups of files across high-speed Wide-Area Networks (WANs). It is commonly used with certificate-based authentication, but can also take place between suitably configured* server and client using SSH as the authentication mechanism.\nThe client may need to have certain ports enabled on the host or institutional firewall if present. Consult your local IT support desk for details and direct them to Configuring GridFTP\u0026nbsp; .\nSSH-based GridFTP does not enable the full feature set provided by certificate-based GridFTP and in particular does not work with Globus Online, which provides useful interfaces and APIs for managing large-scale data transfers, but still provides a major step up in performance by \u0026ldquo;filling the pipe\u0026rdquo; more efficiently than scp/rsync/sftp, particularly over longer distances and can do verification and sync operations as part of the transfer.\nSee also:\nTransfer servers for details on which servers within JASMIN have GridFTP available. Transfers from ARCHER2 for details of different routes affecting your choice of server (since this is the one of the most likely places to which JASMIN users will want to transfer data to/from) Establishing a connection \u0026nbsp; Since you will be using SSH as the authentication mechanism, you should ensure that your initial connection to the JASIMN transfer server is made with the -A option enabled, to enable agent forwarding:\nssh -A username1@hpxfer1.jasmin.ac.uk Note that in order to use hpxfer[12].jasmin.ac.uk you will need to have high-performance data transfer access on your JASMIN account. An alternative to try out beforehand, is to use jasmin- xfer1.ceda.ac.uk.\nUse the globus-url-copy command to list the contents of your home directory on the remote server (This will only work if you already know that that server supports GridFTP over SSH). In this case, we are making the connection to a fictitious server gridftp.remotesite.ac.uk:\nglobus-url-copy -vb -list sshftp://username2@gridftp.remotesite.ac.uk/ If username and username2 are the same (on the different systems, the username@ part of the sshftp URI can be omitted.\nNote that the URI of the server, in this case sshftp://username2@gridftp.remotesite.ac.uk must come immediately after (as it is an argument to) the -list option. This is particularly important if you are combining this command with other options.\nExample GridFTP usage \u0026nbsp; Once you have successfully established that you can connect to the server (as above), then you should be able to transfer data between the remote end (server) and local end (client) with commands such as shown below:\nAs above, if you have the same username on both local and remote systems, then the username@ part of the sshftp URI can be omitted.\nPlease consult the documentation for the globus-url-copy command for the full range of options and arguments.\nglobus-url-copy -help See also \u0026lt;http://toolkit.globus.org/toolkit/docs/latest- stable/gridftp/user/#gridftp-user-basic\u0026gt;\n2. Download a file from remote directory /home/users/USERNAME to destination on the local (client) machine, for example a group workspace on JASMIN:\nglobus-url-copy -vb sshftp://username@gridftp.remotesite.ac.uk/home/users/USERNAME/myfile /group_workspaces/jasmin/myworkspace/myfile The -p N and -fast options can additionally be used in combination to enable N parallel streams at once, as shown below. You can experiment with N in the range 4 to 32 to obtain the best performance, but please be aware that many parallel transfers can draw heavily on shared resources and degrade performance for other users:\nglobus-url-copy -vb -p 16 -fast sshftp://username@gridftp.remotesite.ac.uk/home/users/USERNAME/myfile /group_workspaces/jasmin/myworkspace/myfile 3. Test performance with large files by downloading from /dev/zero on the remote server to /dev/null locally. This excludes any interaction with either filesystem and gives an upper limit to the performance that can be achieved at the time. Repeat with values of N in the range 4 to 32 to compare rates. Note that the performance takes a while to \u0026ldquo;ramp up\u0026rdquo;, so you will not see the best rates if transferring small files individually as the process never gets up to full speed:\nglobus-url-copy -vb -p 16 -fast sshftp://username@gridftp.remotesite.ac.uk/dev/zero /dev/null Press CTRL-C to interrupt the transfer. Alternatively you can specify that the transfer should continue for a fixed duration in seconds using the -t option. In this example, data is transferred from the remote host gridftp.remotesite.ac.uk to jasmin-xfer2.ceda.ac.uk.\nglobus-url-copy -p 16 -fast -t 10 -vb sshftp://username2@gridftp.remotesite.ac.uk/dev/zero /dev/null Source: sshftp://username2@gridftp.remotesite.ac.uk/dev/ Dest: file:///dev/ zero -\u0026gt; null 7797473280 bytes 929.52 MB/sec avg 1024.49 MB/sec inst Cancelling copy... Note the transfer rate achieved in Megabytes/second (MB/sec), although for various reasons this is not to be relied upon as an accurate expectation of speed for real transfers. However, you are unlikely to achieve even half of this data rate viascp, rsync or sftp over the same route. Bbcp may achieve similar rates, however, and this is considered by some as easier to use.\n4. Recursively download the contents of a directory on a remote location to a local destination.\nglobus-url-copy -vb -p 4 -fast -cc 4 -cd -r sshftp://username2@gridftp.remotesite.ac.uk/home/users/USERNAME/mydir/ /group_workspaces/jasmin/myworkspace/mydir/ Where:\n-cc N requests N concurrent transfers (in this case, each with p=4 parallel streams) -cd requests creation of the destination directory if this does not already exist -r denotes recursive transfer of directories -sync and -sync-level options can be used to synchronise data between the two locations, where destination files do not exist or differ (by criteria that can be selected) from corresponding source files. See -help option for details. Upload data (push data from JASMIN to remote server) \u0026nbsp; The above commands can also be adapted to invoke transfers from a local source to a remote destination, i.e. uploading data, since the commands all take the following general form:\nglobus-url-copy [OPTIONS] source-uri desination-uri Be sure to check your connection with the remote machine via a simple SSH login and then a directory listing as shown above.\nJASMIN host as remote server \u0026nbsp; So far the examples have used a server within JASMIN as the client in the GridFTP transfer. The transfer can be reversed so that the client is elsewhere and the JASMIN host is the server specified in the destination URI. The following command should work connecting to one of the following transfer servers: (see also Transfer Servers)\nxfer[12].jasmin.ac.uk xfer3.jasmin.ac.uk (additional access role required) hpxfer[12].jasmin.ac.uk (high-performance data transfer access required) Push data to JASMIN from a remote server:\nglobus-url-copy -vb -p 8 -fast mydir/myfile sshftp://username@hpxfer1.jasmin.ac.uk/group_workspaces/jasmin/myworkspace/mydir/ Note that for this to work, you need to be able to authenticate over SSH to the JASMIN host. This should be possible if you can log in interactively, but will NOT work if you are using the command in a cron job or other situation where your ssh-agent (on the host remote to JASMIN) is not running and/or does not have access to your private key. For those situations, consider using either\nGlobus (recommended), or Gridftp using certificate-based authentication)"
      })
      .add(
      
      
      {
        id: 44,
        tag: "en",
        href: "/guides/guides-coming-soon/",
        title: "Guides coming soon",
        description: "More content to follow soon",
        
        
        content: "Watch this space \u0026nbsp; We\u0026rsquo;ll be adding more content soon, as we reorganise the JASMIN help content further."
      })
      .add(
      
      
      {
        id: 45,
        tag: "en",
        href: "/docs/short-term-project-storage/gws-alert-system/",
        title: "GWS Alert System",
        description: "App to alert GWS managers/deputies when their GWS is reaching capacity",
        
        
        content: "The Group Workspace (GWS) Alert system is a python app which alerts the managers/deputies of a GWS when their GWS is reaching full capacity.\n\u0026nbsp; Please note this service is under beta-testing (June 2024) so if you receive any emails in error please let us know What is the GWS Alert System? \u0026nbsp; A GWS is a collaborative storage made available to a group for a project. Each GWS has a certain quota of storage - more information about how the storage is being used within a GWS can be found using the GWS Scanner UI. The GWS Alert System is set up to notify the managers/deputies of a GWS when it is reaching full capacity so the managers can make some more space available.\nHow the GWS Alert System runs \u0026nbsp; The Python app gets a list of all GWSs from the JASMIN Projects Portal\u0026nbsp; , gets the storage information - i.e. how much storage has been used and how much is available, then sends an email alert if the GWS is over a certain percentage full. The managers and deputies are obtained from the JASMIN Projects Portal\u0026nbsp; .\nThe GWS Alert System runs on a schedule at 11am daily.\nThreshold value \u0026nbsp; The threshold value at which alerts are sent is obtained from a file within the GWS. The file is found at GWS_PATH/.gws_scan/config.ini. The file should look something like this, for a threshold of 80%:\n[general] volume_warning_threshold = 80where the volume_warning_threshold (without the % symbol) is the threshold value used in the GWS Alert system.\nIf no file can be found, the default value of 90 is used.\nIssues and questions \u0026nbsp; If you receive an email in error, or you think the email may contain incorrect information, please let us know.\nIf you\u0026rsquo;d like to change the threshold value, please update the volume_warning_threshold value in the config.ini file as described above. If the value hasn\u0026rsquo;t been updated the following day, please let us know.\nIf you make changes to your storage and these aren\u0026rsquo;t reflected in the next alert, please let us know.\nFor more information about managing a GWS, see https://help.jasmin.ac.uk/docs/short-term-project-storage/managing-a-gws/.\nIf you have any questions or suggestions, feel free to get in touch."
      })
      .add(
      
      
      {
        id: 46,
        tag: "en",
        href: "/docs/short-term-project-storage/gws-etiquette/",
        title: "GWS etiquette",
        description: "GWS  etiquette",
        
        
        content: "This article highlights the essential principles of working with group workspaces.\nKeeping informed \u0026nbsp; Please maintain contact throughout the life of the GWS via the following methods:\nUsing the JASMIN dashboard to check on the status of your GWS (used versus available space). Using the GWS Scanner User Interface to check on where, for how long and by whom, space is being used. GWS Managers should configure the GWS Scanner to gather the above information and arrange email alerts. Look out for emails from the CEDA/JASMIN team News articles on the CEDA\u0026nbsp; or JASMIN\u0026nbsp; websites and by monitoring CEDA social media\u0026nbsp; feeds which may be used to post messages regarding system status or security. If you are aware that a user who has access to your GWS leaves your project, or, for whatever reason, no longer needs to be a member of the GWS, please let the CEDA helpdesk know, as arrangements may need to be made to transfer the ownership of files and/or directories to another member of the GWS (e.g. the manager) to ensure continued access to the data."
      })
      .add(
      
      
      {
        id: 47,
        tag: "en",
        href: "/docs/short-term-project-storage/gws-scanner/",
        title: "GWS Scanner",
        description: "GWS Scanner",
        
        
        content: "Introduction \u0026nbsp; This article explains about the process that runs in the background scanning all group workspaces to gather basic information about usage, which are fed into a database to be made available to users via the GWS Scanner User Interface.\nIt is intended for GWS Managers and provides details about how to customise the scan that is done on each GWS.\nIt is run centrally, and is a very resource-intensive task, so please don\u0026rsquo;t run similar tasks of your own, as you will be unnecessarily duplicating resource usage.\nThere are two different scans of the Group Workspaces (GWSs).\nA daily scan which checks for how full the GWS is, and will email the GWS manager if it is over the default threshold of 83%, or a defined threshold in the GWS config file (see below). An approximately fortnightly check of the contents of all GWSs. As a GWS Manager you will receive e-mails summarising the usage and contents of the GWS. By default this is a simple volume level summary of the GWS.\nCustomisation \u0026nbsp; If you wish for additional directories to be scanned and summarised please add these to the GWS_PATH/.gws_scan/config.ini, where GWS_PATH is the path to your group workspace (the directory and the file may need to be created). Directories can also be excluded from the scan in the same way. This can be useful for speeding up the run time of a scan. Here is an example of a config.ini file.\n\u0026nbsp; Please note that the required directory for this configuration data is .gws_scan, not .gws_scanner - the latter is from the previous incarnation of the scanner, and will be be removed in due course) [general] # GWS fullness threshold for which the daily scan will send a warning email (default 83) (in %) volume_warning_threshold = 83 # Directories to check for largest sub-dir and filetypes below (comma separated list), these paths must be relative to the group workspace path i.e. path/to/dir, not /group/workspace/path/to/dir # Defaults to all top level directories inside volume dirs = dir1,path/to/dir2 # Directories to exclude from the scan. This can be useful to speed up the scan if there are know directories with a large number of files, for which the scan information is not very useful excl_dirs = path/to/excl, large_dir # Filetype extensions to count inside directories above (comma separated list) # Defaults to none exts = html,py,jsdirs and excl_dirs can have the * wildcard anywhere in the directory path. From the config above for example: path/to/*, and p*h/to/dir2 would pick up the directory /path/to/dir2, and any other directories which matched the pattern.\nPlease don\u0026rsquo;t comment out the arguments. If you don\u0026rsquo;t want to use one just leave it blank, this will then just use the internal defaults. E.g.\n[general] volume_warning_threshold = dirs = excl_dirs = exts = Report \u0026nbsp; When the fortnightly scan runs it sends the output to the GWS manager as an email, which looks like this:\n### Group Workspace Report for: GWS_PATH #### Scan Details Time most recent scan started: 16/04/2019 - 10:15:57 Time most recent scan finished: 16/04/2019 - 12:25:27 Duration of most recent scan (h:m:s): 2:09:29 Scan Complete: True #### Usage Details Filesystem: fuse.quobyte Total Storage: 199.2 TiB Used Storage: 81.8 TiB Free Storage: 117.4 TiB Usage: 42% #### Directory Details To get information about specific directories within this volume, please add the relative paths to the volume config file (.gws_scan/config.ini) - see [https://help.jasmin.ac.uk/article/4499-gws-scanner](https://help.jasmin.ac.uk/docs/short-term-project-storage/gws-scanner/) **Directory** | **Total Files** | **Total Size** | **Sub-directory with most files** | **Files in this Sub-directory** ---|---|---|---|--- all_dirs | 238336 | 81.8 TiB | GWS_PATH/dir1/example/path | 7929 .gws_scanner | 0 | 0.0 B | None | 0 dir1 | 0 | 0.0 B | GWS_PATH/dir1/example/path | 0 #### Filetype Details To get information on the quantity and size of specific filetypes under the directories above, please add the relevant file extensions to the volume config file (.gws_scan/config.ini) - see [https://help.jasmin.ac.uk/article/4499-gws-scanner](https://help.jasmin.ac.uk/docs/short-term-project-storage/gws-scanner/) _No filetypes requested_"
      })
      .add(
      
      
      {
        id: 48,
        tag: "en",
        href: "/docs/short-term-project-storage/gws-scanner-ui/",
        title: "GWS Scanner UI",
        description: "User interface to GWS scanner",
        
        
        content: "The Group Workspace (GWS) Scanner UI is an interactive web application for JASMIN users to view their GWSs.\nPlease note this service is under beta-testing and should be used with care (July 2023)\nWhat is the GWS Scanner UI? \u0026nbsp; A GWS is collaborative storage made available to a group for a project. The GWS Scanner UI provides information about the structure of GWSs in the form of a tree graph showing the folders within the GWS. The tiles of the graph can be scaled or coloured by size, count or heat.\nSize refers to the size (in TB or GB) of the folder count refers to the number of files and folders within the directory heat refers to the average time since last access (hot = recent). The tree graph only shows tiles for the folders within the GWS, the files are lumped together as unindexed children, but the files are considered in the calculation of the GWS statistics - e.g. the number of children is the number of folders and files within the GWS. There are also doughnut graphs with additional breakdowns in terms of users, filetypes and heats which can be scaled by either size or count.\nUsing the GWS Scanner UI \u0026nbsp; Navigate to the GWS Scanner homepage where you should see a Log In button.\nClicking the login button will take you to the login page where you can sign in using your JASMIN account. Upon successful sign-in you should be redirected back to the homepage where you will have the option to view your GWSs.\n\u0026nbsp; At any time, you can click the JASMIN logo in the navbar to return to the homepage. Here you will see a table with the names of your GWSs and their path. Clicking on the path will take you to the tree page for the GWS.\nAlternatively, if you know the path to your GWS you can search for it in the url, e.g. https://gws-scanner.jasmin.ac.uk/tree/\u0026lt;path-here\u0026gt;. On this page you will see the path to your GWS at the top, then the tree graph with the coloured tiles representing folders within the GWS. Note that some larger GWSs may take longer to load.\nThere is a Toggle Patterns button which can be used to swap the coloured tiles for patterned tiles. Hovering over a tile will reveal more information about that folder. There are buttons on the right hand side to scale and colour the tiles by size, count or heat as described earlier. There is also a key showing the values the colour of the tiles correspond to in this sidebar as well as information showing when the GWS was last scanned. Scans usually take around two weeks to complete so each GWS should be scanned approximately fortnightly. There is a Go Up One Level button which will take you back a level, but note that this will only work if you have gone deeper into the file path as it will not show the structure above the root GWS folder. You can click on a tile on the graph to view the tree graph inside that folder. For example, you may have a folder called user1 in group-workspace-1, you could click on this tile to see the structure of the user1 directory then you could use the Go Up One Level button to go back to group-workspace-1. Alternatively, you can just use the back button in your browser to go back. You can keep clicking files to go deeper into the GWS structure until you reach an unindexed children level where there are no more folders, only files. This is represented by a tile saying unindexed children which refers to a collection of files (every level will have an unindexed children tile representing the files within that folder).\nScrolling down the page, you will find the doughnut graphs. There is one for the User Breakdown, Filetype Breakdown and Heat Breakdown. Each of these have coloured sections corresponding to different users, filetypes or heats and the size of them is proportional to the size or count (there are Size and Count buttons to change between them). Again, hovering over a section of the graph will give you more information.\nCommon issues and questions \u0026nbsp; If you get stuck on a loading screen try refreshing the page - we are working on fixing this issue. If you go to the My GWSs page and don\u0026rsquo;t have any GWSs listed, check that your JASMIN account does have access to the GWS you are looking for. Sometimes, if there are lots of tiles they can be hard to read - you can hover over the tile to get the full title or if you want to view the tree graph for that folder, you search for it by URL instead. If you are ever stuck and requiring help, the help beacon can be accessed from any page. Further information \u0026nbsp; Here are some links to learn more about the GWS Scanner:\nThe GWS Scanner UI If you have any questions or suggestions, feel free to get in touch."
      })
      .add(
      
      
      {
        id: 49,
        tag: "en",
        href: "/docs/mass/how-to-apply-for-mass-access/",
        title: "How to apply for MASS access",
        description: "How to apply for MASS access",
        
        
        content: "Introduction \u0026nbsp; To access data held in the Met Office MASS archive, you will need:\na sponsor access to the mass-cli1 client machine a MASS account Your sponsor will need to be a Senior Met Office Scientist with whom you are working on a collaborative research project. If you are a Met Office employee, your sponsor will be your manager.\nNote: The following instructions also assume you already have a JASMIN login account and the jasmin-login service. If you do not, please follow steps 1-4 here.\nStep One - Sponsor Form \u0026nbsp; Ask your sponsor to:\nComplete the sponsor form Please note that the link above is only visible to those in the Met Office.\nThe following information will be asked for, so please provide your sponsor with any details they may not have:\nYour full name Your official email address Your organization\u0026rsquo;s name Your department name The host country of your organization A list of MASS projects and/or data sets that you need access to. A full MOOSE dataset path is required, and your sponsor should help you determine this. Your JASMIN username Your JASMIN user ID number (UID). You can get this by typing echo $UID at the terminal on any JASMIN machine. The information you provide to the Met Office will be treated in accordance with the [Met Office Privacy Policy](https://www.metoffice.gov.uk/about- us/legal/privacy), and your use of the service will be subject to the [Terms and Conditions of Use](https://metoffice.github.io/JASMIN-MASS- access/Terms_and_Conditions.html) for the service.\nStep Two - Access to mass-cli1 \u0026nbsp; Sign into your JASMIN account Select ‘JASMIN Services’ Select ‘Additional Services’ Next to ‘mass’ click ‘More information’ Select ‘Apply for access’ Within the request, please name your sponsor The direct link is: https://accounts.jasmin.ac.uk/services/additional_services/mass/\nStep Three - MASS account \u0026nbsp; When steps one and two are complete, you will be provided with a specific MASS account to use on JASMIN and emailed a MOOSE credentials file. Please see Setting up your JASMIN account for access to MASS once you have received the credentials file. Your MASS account will give (read-only) access to the relevant data on MASS based on the information provided by your sponsor; please note that the access control is handled by the Met Office and not by the JASMIN team.\nNote: If you have access to MASS on other systems you cannot copy those MOOSE credentials file/s onto JASMIN – they will not work! Please also see the External Users’ MOOSE Guide for what MOOSE commands are available on JASMIN."
      })
      .add(
      
      
      {
        id: 50,
        tag: "en",
        href: "/docs/getting-started/how-to-contact-us-about-jasmin-issues/",
        title: "How to contact us about JASMIN issues",
        description: "How to contact us about JASMIN issues",
        
        
        content: "If you are experiencing difficulties or slow performance and are unsure why, please first consult all relevant documentation, then if needed, contact our Helpdesk using the help beacon below, but please include the following information with your initial query:\nWhat is the full name of the JASMIN server were you using? ( e.g. sci1.jasmin.ac.uk) The full path of your current working directory e.g. `/gws/nopw/j04/mygws`` Date \u0026amp; time that the issue occurred Your JASMIN account username Your description of the issue and copy/paste any error messages from the terminal Location of code/script used - if possible, so one of the CEDA/JASMIN team can reproduce the issue A batch job ID if it relates to LOTUS jobs Please provide as much specific information as possible so that we can direct your query to the appropriate staff and deal with your enquiry efficiently. Hopefully, the time invested in solving your issue will also help other JASMIN users now and in the future."
      })
      .add(
      
      
      {
        id: 51,
        tag: "en",
        href: "/docs/getting-started/login/",
        title: "How to login",
        description: "How to login to JASMIN",
        
        
        content: "The instructions below cover the process of logging in using a terminal client only. For a graphical linux desktop, please see alternative instructions using NoMachine NX.\nPreparing your credentials: loading your SSH private key \u0026nbsp; In order to log in using SSH, you need to present your SSH private key as your credential (instead of a username and password). Your private key should reside only on your local machine, so this process of loading your key is something that you do on that local machine. Even if you connect via a departmental server, there should be no need to upload your private key to that machine: the process of loading your key and enabling agent forwarding should ensure that the key is available to subsequent host(s) in the chain of SSH \u0026ldquo;hops\u0026rdquo;.\nThe details of how to do this can vary depending on whether your local machine runs Windows, macOS or Linux.\nWhichever system you\u0026rsquo;re using, you will need to use an appropriate tool to load your private key so that it can be presented at the time of logging in.\nLinux and macOS users: ssh-agent can be used (see instructions below).\nWindows users: we recommend the MobAgent utility within MobaXterm. MobaXterm is a Linux terminal emulator for Windows.\nssh-agent is a utility that stores private keys and makes them available to other software that use the SSH protocol to connect to remote clients.\nThere are two stages to loading your private key into ssh-agent: starting the agent and then loading your private key. Use the following commands to do this:\n\u0026nbsp; IMPORTANT: The box below is an example of what your command line prompt might look like.\nThe username and computer name on the left indicates which machine you are currently on. Everything to the right of the dollar symbol \u0026lsquo;$\u0026rsquo; is the command which you are entering into the terminal.\nYou don\u0026rsquo;t need to type the \u0026lsquo;$\u0026rsquo; or anything before it!\nThe rest of the documentation will use this format to show whether you should run the command on your local machine (user@localhost) or on JASMIN (user@sci1).\neval $(ssh-agent -s) ssh-add ~/.ssh/id_rsa_jasmin Enter passphrase for /home/users/jpax/.ssh/id_rsa_jasmin: Identity added: /home/users/jpax/.ssh/id_rsa_jasmin (/home/users/jpax/.ssh/id_rsa_jasmin) When you run the ssh-add command you will be prompted to enter the passphrase that you specified when generating your SSH key pair. (If you use the c shell, replace the command eval $(ssh-agent -s) with exec ssh-agent $SHELL)\nYou can test whether your key has been loaded by using the \u0026ldquo;-l\u0026rdquo; option to list the currently loaded keys in your agent:\nssh-add -l 2048 SHA256:iqX3NkPCpschVdqPxVde/ujap2cM0mYaAYYedzBGPaI /Users/jpax/.ssh/id_rsa_jasmin (RSA) This confirms that the key in id_rsa_jasmin has been loaded and is ready for use.\nNotes:\nThe ssh-agent session should persist until killed or until system shutdown, even if you close the terminal in which you set it up. It is very important that you protect your private key with a strong passphrase, known only to you. Keys must not be shared between individuals. If you get an error when attempting the above commands please see login problems. Your public key will have been automatically propagated by the JASMIN accounts system to all the machines to which you have access rights, so should already be present in the correct place. Do not attempt to place the public key manually on any host within JASMIN: it will get automatically overwritten. Mac users (OS X Leopard onwards) can optionally benefit from linking the SSH key to Keychain, which securely stores the passphrase as well. This means that even after a reboot, your SSH key is always available in any terminal session automatically. You can do this by running ssh-add with --apple-use-keychain:\nssh-add ~/.ssh/id_rsa_jasmin --apple-use-keychain And then by adding the corresponding command with --apple-load-keychain to your .zshrc file so that it loads it for every new terminal session:\necho \u0026#34;ssh-add --apple-load-keychain\u0026#34; \u0026gt;\u0026gt; ~/.zshrc The JASMIN login servers \u0026nbsp; See this article for a description and listing of the login servers.\nLogging in to JASMIN \u0026nbsp; Assuming that you have loaded your SSH private key using one of the methods described above, then you can login to a login server as follows (do this on your own/local machine):\nssh -A \u0026lt;user_id\u0026gt;@\u0026lt;login_server\u0026gt; For example, user \u0026ldquo;jpax\u0026rdquo; might login to the JASMIN login server with:\nssh -A jpax@login1.jasmin.ac.uk The -A argument is important because it enables \u0026ldquo;agent-forwarding\u0026rdquo;. This means that your the information about your SSH private key is forwarded to your remote session on the login server so that you can use it for further SSH connections. (Windows users can enable X-forwarding in MobaXterm saved sessions).\nCan\u0026rsquo;t login? \u0026nbsp; Check our troubleshooting guide: login problems The login message \u0026nbsp; When you first login you will see a message that provides some useful information (see Figure 1).\nThe login message shown on login1.jasmin.ac.uk. X-forwarding for graphical applications (within JASMIN only) \u0026nbsp; Some applications involve displaying graphical output from an application or user interface running on a remote server, typically to display or interact with data graphically. You can instruct your SSH connection to enable forwarding of X-server capability by adding the -X argument to the ssh command, as follows:\nssh -X \u0026lt;user\u0026gt;@\u0026lt;hostname\u0026gt; Note that the -X argument can be used in conjunction with the agent-forwarding -A argument. In some cases the -Y option may be needed instead of -X.\nPlease note that this arrangement sends your graphical output back to your desktop machine over the network, so should only be used within JASMIN, not to your local desktop machine. A solution has been put in place for a graphical linux desktop environment within JASMIN using NoMachine NX, removing the need to send X11 graphics over the wide-area network. You are strongly advised to use NX for any situation which involves graphical output on JASMIN. Using X11 graphics over the wide-area network outside of JASMIN is not supported: you will not get good performance and this makes inefficient use of shared resources which can impair performance for other users. Please use NX instead. Of course, you may still need to use X11 graphics to send graphical output back to your JASMIN-side graphical desktop within JASMIN, but this is OK as it is all within the JASMIN network.\nWhere next? \u0026nbsp; Having been through all the steps and logged in to JASMIN (well done!) you will be keen to do some real work. You could try the general purpose scientific analysis servers to get started. Use the list presented on the login screen to select a sci server which is not under heavy usage.\nFor example, from the JASMIN login server, you might choose to login to sci1:\nssh \u0026lt;user\u0026gt;@sci1.jasmin.ac.uk If you are asked for a password when trying to login to this second machine, it indicates that your ssh key is not being forwarded. Please check that you have used the -A option in your initial connection to the login server, or set up agent forwarding permanently in your SSH client configuration on your local machine.\nThere is no point in trying to enter a password (or even the passphrase associated with your key) as only an ssh key presented in the way described above is accepted.\nNote that once you are logged into a login server then you can omit the \u0026lt;user_id\u0026gt;@ prefix before the server name for the onward connection, since your username will be the same on both systems. But there is no harm in including it anyway, to ensure that you connect as the correct user. As shown above, the -A option is not needed for the onward connection, although there is no harm in including it.\nRemember to log out of the login server in addition to the sci server when you have finished your work, to get back to your own (local) machine:\nexit logout Connection to sci1.jasmin.ac.uk closed. exit logout Connection to login1.jasmin.ac.uk closed. # back on your own/local machine now"
      })
      .add(
      
      
      {
        id: 52,
        tag: "en",
        href: "/docs/batch-computing/how-to-monitor-slurm-jobs/",
        title: "How to monitor Slurm jobs",
        description: "How to monitor Slurm jobs",
        
        
        content: "Job information \u0026nbsp; Information on all running and pending batch jobs managed by Slurm can be obtained from the Slurm command squeue. Note that information on completed jobs is only retained for a limited period. Information on jobs that ran in the past is via sacct. An example of the output squeue is shown below.\nsqueue JOBID PARTITION NAME USER ST TIME NODES NODELIST(REASON) 18957 short-ser mean user1 R 0:01 1 host147 18956 short-ser calc user2 R 48:38 1 host146 18967 test wrap user1 R 14:25 1 host146 where the field ST is the job state and the TIME is the time used by the job.\nA batch job evolves in several states in the course of its execution. The typical job states are defined in Table 1\nTable 1: Job states\nSymbol Job state Description PD Pending The job is waiting in a queue for allocation of resources R Running The job currently is allocated to a node and is running CG Completing The job is finishing but some processes are still active CD Completed The job has completed successfully F Failed Failed with non-zero exit value TO Terminated Job terminated by Slurm after reaching its runtime limit S Suspended A running job has been stopped with its resources released to other jobs ST Stopped A running job has been stopped with its resources retained Slurm commands for monitoring jobs \u0026nbsp; A list of the most commonly used commands and their options for monitoring batch jobs are listed in Table 2, below:\nTable 2. List of important Slurm commands and their options for monitoring jobs\nSlurm Command Description squeue To view information for all jobs running and pending on the cluster squeue --user=username Displays running and pending jobs per individual user squeue --states=PD Displays information for pending jobs (PD state) and their reasons squeues --states=all Shows a summary of the number of jobs in different states scontrol show job JOBID Shows detailed information about your job (JOBID = job number) by searching the current event log file sacct -b Shows a brief listing of past jobs sacct -l -j JOBID Shows detailed historical job information of a past job with jobID Inspection of job output files \u0026nbsp; An example of the job output file from a simple job submitted to Slurm:\nsbatch -p test --wrap=\u0026#34;sleep 2m\u0026#34; Submitted batch job 18973 scontrol show job 18973 JobId=18973 JobName=wrap UserId=fchami(26458) GroupId=users(26030) MCS_label=N/A Priority=1 Nice=0 Account=jasmin QOS=normal JobState=RUNNING Reason=None Dependency=(null) Requeue=1 Restarts=0 BatchFlag=1 Reboot=0 ExitCode=0:0 RunTime=00:00:08 TimeLimit=01:00:00 TimeMin=N/A SubmitTime=2020-05-20T14:10:28 EligibleTime=2020-05-20T14:10:28 AccrueTime=2020-05-20T14:10:28 StartTime=2020-05-20T14:10:32 EndTime=2020-05-20T15:10:32 Deadline=N/A SuspendTime=None SecsPreSuspend=0 LastSchedEval=2020-05-20T14:10:32 Partition=test AllocNode:Sid=sci2-test:18286 ReqNodeList=(null) ExcNodeList=(null) NodeList=host147 BatchHost=host147 NumNodes=1 NumCPUs=1 NumTasks=1 CPUs/Task=1 ReqB:S:C:T=0:0:*:* TRES=cpu=1,mem=128890M,node=1,billing=1 Socks/Node=*NtasksPerN:B:S:C=0:0:*:* CoreSpec=* MinCPUsNode=1 MinMemoryNode=128890M MinTmpDiskNode=0 Features=(null) DelayBoot=00:00:00 OverSubscribe=OK Contiguous=0 Licenses=(null) Network=(null) Command=(null) WorkDir=/home/users/fchami StdErr=/home/users/fchami/slurm-18973.out StdIn=/dev/null StdOut=/home/users/fchami/slurm-18973.out Power= History of jobs \u0026nbsp; sacct JobID JobName Partition Account AllocCPUS State ExitCode ------------ ---------- ---------- ---------- ---------- ---------- -------- 18963 wrap par-single jasmin 1 COMPLETED 0:0 18964 wrap short-ser+ jasmin 1 COMPLETED 0:0 18965 wrap par-single jasmin 1 COMPLETED 0:0 18966 wrap short-ser+ jasmin 1 COMPLETED 0:0"
      })
      .add(
      
      
      {
        id: 53,
        tag: "en",
        href: "/docs/batch-computing/how-to-submit-a-job/",
        title: "How to submit a job",
        description: "How to submit a job to Slurm",
        
        
        content: "This article explains how to submit a batch job to the new scheduler Slurm.\nWhat is a batch job? \u0026nbsp; A batch job is controlled by a script written by the user who submits the job to the batch system Slurm. The batch system then selects the resources for the job and decides when to run the job. Note: the term \u0026ldquo;job\u0026rdquo; is used throughout this documentation to mean a \u0026ldquo;batch job\u0026rdquo;.\nThere are two ways of submitting a job to Slurm:\nSubmit via a Slurm job script - create a bash script that includes directives to the Slurm scheduler Submit via command-line options - provide directives to Slurm via command-line arguments Both options are described below.\nWhich servers can you submit jobs from? \u0026nbsp; Jobs can be submitted to Slurm from the following Sci machines:\nsci1.jasmin.ac.uk sci2.jasmin.ac.uk sci3.jasmin.ac.uk sci4.jasmin.ac.uk sci5.jasmin.ac.uk sci6.jasmin.ac.uk sci8.jasmin.ac.uk Method 1: Submit via a Slurm job script \u0026nbsp; The Slurm job submission command is:\nsbatch myjobscript The job script is a Bash script of user\u0026rsquo;s application and includes a list of Slurm directives, prefixed with #SBATCH as shown in this example:\n#!/bin/bash #SBATCH --partition=short-serial #SBATCH -o %j.out #SBATCH -e %j.err #SBATCH --time=05:00 # executable sleep 5mFor job specification of resources please refer to Table 2 of the help article Slurm quick reference\nMethod 2: Submit via command-line options \u0026nbsp; If you have an existing script, written in any language, that you wish to submit to LOTUS then you can do so by providing Slurm directives as command- line arguments. For example, if you have a script \u0026ldquo;my-script.py\u0026rdquo; that takes a single argument \u0026ldquo;-f \u0026rdquo;, you can submit it using \u0026ldquo;sbatch\u0026rdquo; as follows:\nsbatch -p short-serial -t 03:00 -o job01.out -e job01.err my-script.py -f myfile.txtThis approach allows you to submit jobs without writing additional job scripts to wrap your existing code.\nMethod 3: Submit an interactive session via salloc \u0026nbsp; Testing a job on LOTUS can be carried out in an interactive manner by obtaining a Slurm job allocation or resources (a set of nodes) via the Slurm command salloc . The code/application is executed and the allocation are released after a specific time -default 1 hour - when the testing is finished. There are two ways:\nInteractive execution with pseudo-shell terminal on the compute LOTUS node \u0026nbsp; The job is executed on the LOTUS compute node by invoking the Slurm command srun after allocating resources with salloc. See example below.\nsalloc -p par-single --ntasks-per-node=2 salloc: Pending job allocation 23506 salloc: job 23506 queued and waiting for resources salloc: job 23506 has been allocated resources salloc: Granted job allocation 23506The job allocation ID 23506 has 2 CPUs on the compute node host580 as shown below:\nsqueue -u train001-o\u0026#34;%.18i %.9P %.11j %.8u %.2t %.10M %.6D %.6C %R\u0026#34; JOBID PARTITION NAME USER ST TIME NODES CPUS NODELIST(REASON) 23506 par-singl interactive usertest R 1:32 1 2 host580To launch an interactive shell session on the compute node host580, use the following srun command (from a sci server).\nsrun --pty /bin/bash @host580 ~]$ Interactive execution with no shell \u0026nbsp; A code/application can be executed on the LOTUS compute node without a shell session on the node itself. For example the command \u0026lsquo;hostname\u0026rsquo; is executed twice as there are 2 CPUs and this outputs the name of the node\nsrun hostname host580.jc.rl.ac.uk host580.jc.rl.ac.uk Job array submission \u0026nbsp; Job arrays are groups of jobs with the same executable and resource requirements, but different input files. Job arrays can be submitted, controlled, and monitored as a single unit or as individual jobs or groups of jobs. Each job submitted from a job array shares the same job ID as the job array and is uniquely referenced using an array index. This approach is useful for ‘high throughput\u0026rsquo; tasks, for example where you want to run your simulation with different driving data or run the same processing task on multiple data files.\nImportant note: The maximum job array size that Slurm is configured for is MaxArraySize = 10000. If a Job array of size is greater than 10000 is submitted, Slurm will reject the job submission with the following error message: \u0026ldquo;Job array index too large. Job not submitted.\u0026rdquo;\nTaking a simple R submission script as an example:\n#!/bin/bash #SBATCH --partition=short-serial #SBATCH --job-name=myRtest #SBATCH -o %j.out #SBATCH -e %j.err #SBATCH --time=30:00 module add jasr Rscript TestRFile.R dataset1.csvIf you want to run the same script TestRFile.R with input file dataset2.csv through to dataset10.csv, you could create and submit a job script for each dataset. However, by setting up an array job, you could create and submit a single job script.\nThe corresponding job array script to process 10 input files in a single job submission would look something like this:\n#!/bin/bash #SBATCH --partition=short-serial #SBATCH --job-name=myRarray #SBATCH -o %A_%a.out #SBATCH -e %A_%a.err #SBATCH --time=30:00 #SBATCH --array=1-10 module add jasr Rscript TestRFile.R datset$SLURM_ARRAY_TASK_ID.csvHere the important differences are :\nThe array is created by Slurm directive --array=1-10 by including elements numbered [1-10]to represent our 10 variations The error and output file have the array index %a included in the name and %A is the job ID. The environment variable $SLURM_ARRAY_TASK_ID in the Rscript command is expanded to give the job index When the job is submitted, Slurm will create 10 tasks under the single job ID. The job array script is submitted in the usual way:\nsbatch myRarray.sbatchIf you use the squeue -u \u0026lt;username\u0026gt; command to list your active jobs, you will see 10 tasks with the same Job ID. The tasks can be distinguished by the [index] e.g. jobID_index. Note that individual tasks may be allocated to a range of different hosts on LOTUS."
      })
      .add(
      
      
      {
        id: 54,
        tag: "en",
        href: "/docs/batch-computing/how-to-submit-an-mpi-parallel-job/",
        title: "How to submit an MPI parallel job",
        description: "How to submit an MPI parallel job",
        
        
        content: "This article explains the submission of an MPI parallel job to Slurm/ LOTUS.\nWhat is an MPI parallel job? \u0026nbsp; An MPI parallel job runs on more than one core and more than one host using the Message Passing Interface (MPI) library for communication between all cores. A simple script, such as the one given below \u0026ldquo;my_script_name.sbatch \u0026quot;\n#!/bin/bash #SBATCH -p par-multi #SBATCH -n 36 #SBATCH -t 30 #SBATCH -o %j.log #SBATCH -e %j.err # Load a module for the gcc OpenMPI library (needed for mpi_myname.exe) module load eb/OpenMPI/gcc/4.0.0 # Start the job running using OpenMPI\u0026#39;s \u0026#34;mpirun\u0026#34; job launcher mpirun ./mpi_myname.exe-n refers to the number of processors or cores you wish to run on. The rest of the #SBATCH input options, and many more besides, can be found in the sbatch manual page or in the related articles. You must only use the par- multi queue for parallel jobs using MPI.\nFor those familiar with LOTUS running Platform MPI and Platform LSF, please note that the job is started using the OpenMPI native \u0026ldquo;mpirun\u0026rdquo; command not the \u0026ldquo;mpirun.lotus\u0026rdquo; wrapper script that was previously required. We have provided an mpirun.lotus script for backward compatiblity but it just runs the native mpirun\nTo submit the job, do not run the script, but rather use it as the standard input to sbatch, like so:\nsbatch --exclusive my_script_name.sbatchThe --exclusive flag is used to group the parallel jobs onto hosts which are allocated only to run this job. This ensures the best MPI communication consistency and bandwidth/latency for the job and ensures no interference from other users\u0026rsquo; jobs that might otherwise be running on those hosts.\nMPI implementation and Slurm \u0026nbsp; The OpenMPI library is the only supported MPI library on the cluster. OpenMPI v3.1.1 and v4.0.0 are provided which are fully MPI3 compliant. MPI I/O features are fully supported only on the LOTUS /work/scratch-pw* volumes as these use a Panasas fully parallel file system. The MPI implementation on CentOS7 LOTUS/Slurm is available via the module environment for each compiler as listed below:\neb/OpenMPI/gcc/3.1.1 eb/OpenMPI/gcc/4.0.0 eb/OpenMPI/intel/3.1.1Note: OPenMPI Intel compiler is due shortly as is 4.0.3\nParallel MPI compiler with OpenMPI \u0026nbsp; Compile and link to OpenMPI libraries using the mpif90, mpif77, mpicc, mpiCC wrapper scripts which are in the default unix path. The scripts will detect which compiler you are using (Gnu, Intel) by the compiler environment loaded and add the relevant compiler library switches. For example:\nmodule load intel/20.0.0 module load eb/OpenMPI/intel/3.1.1 mpif90will use the Intel Fortran compiler ifort and OpenMPI/3.1.1. Whereas\nmodule load eb/OpenMPI/gcc/3.1.1 mpiccwill call the GNU C compiler gcc and OpenMPI/3.1.1.\nThe OpenMPI User Guides can be found at https://www.open-mpi.org/doc/."
      })
      .add(
      
      
      {
        id: 55,
        tag: "en",
        href: "/docs/data-transfer/hpxfer-access-role/",
        title: "hpxfer access role",
        description: "Access to certain high-performance data transfer methods",
        
        
        content: "This article explains about access to high-performance data transfer services.\nApplying for access \u0026nbsp; Some data transfer services are hosted in the JASMIN Data Transfer Zone (a special area of JASMIN\u0026rsquo;s network, located optimally for connections to the outside world via JANET\u0026nbsp; ) for increased performance. However, to maintain security in this zone, access to some services is controlled via an additional access role hpxfer. If you have a login account already, you can apply here for this additional role:\nApply for hpxfer\u0026nbsp; \u0026nbsp; \u0026nbsp; Additional information required \u0026nbsp; If you will be connecting from your home institution directly via ssh or ssh- based gridftp to one of the servers in the JASMIN Data Transfer Zone, the specific IP address of your machine will need to be added to an allow-list. Please supply this as part of the application process above.\nHowever, this should not be necessary if you are accessing the server from a remote server which is already allowed.\n\u0026nbsp; If your only reason for applying for hpxfer is in order to use the Globus service on JASMIN, this is no longer required. You only need this role for accessing the hpxfer servers or for using certificate-based gridftp with the globus-url-copy command. Inward pulls of data (to JASMIN) are possible by logging in to hpxfer[1,2].jasmin.ac.uk via the login servers and pulling data from external data sources. So if you\u0026rsquo;re not sure what IP address to use when applying for access above, it is OK to quote the IP address of login1.jasmin.ac.uk, i.e. 130.246.130.28 as a \u0026ldquo;dummy\u0026rdquo; value if you will only be accessing them via this route, and not directly from outside."
      })
      .add(
      
      
      {
        id: 56,
        tag: "en",
        href: "/docs/software-on-jasmin/idl/",
        title: "IDL",
        description: "IDL",
        
        
        content: "This article explains how to:\nuse the IDL software on JASMIN run these tools on the scientific analysis servers and LOTUS make efficient use of the IDL licences What is IDL? \u0026nbsp; IDL stands for Interactive Data Language. It is a licensed data manipulation toolkit made available on JASMIN.\nAvailability of IDL on JASMIN \u0026nbsp; IDL is available on all scientific analysis servers and LOTUS.\n\u0026nbsp; The related software MIDL is no longer available on JASMIN To get started with IDL, login to one of scientific analysis servers and do as follows:\nmodule load idl idl IDL Version 8.5 (linux x86_64 m64). (c) 2015, Exelis Visual Information Solutions, Inc., a subsidiary of Harris Corporation. Installation number: 406672. Licensed for use by: Science \u0026amp; Technology Facilitie You can then type commands at the IDL prompt\nprint,1+4 5 exit For help on the idl module you can type the following :\nmodule help idl ----------- Module Specific Help for \u0026#39;idl/8.2\u0026#39; -------------------- Adds IDL 8.2 to your environment variables, Making efficient use of IDL development licences \u0026nbsp; We have a large pool of run-time licences but a much more limited pool of development licences. In each case, these consist of floating licences shared between JASMIN sci machines and the LOTUS cluster.\nUsers are welcome to run multiple instances of IDL code, but for that purpose please make use of the run-time licences by compiling your code using a single development session and then running the pre-compiled code using the -rt flag. An example of this is shown in the next section (below).\nPlease try not to run more than one or two simultaneous IDL development sessions. However, for licence purposes, each unique combination of username, hostname, and $DISPLAY variable counts as a single session. So for example, if you run idl (development mode) in one window, then suspend it with CTRL-Z and start another development session in the same window, this still is only counted as one session by the licence server because the username, hostname, and $DISPLAY are all identical between the two processes. But if you \u0026ldquo;ssh\u0026rdquo; in on two different windows, probably the $DISPLAY will differ between the two windows (e.g. localhost:10 and localhost:11), so if you start idl development sessions in each window they will require separate licences.\nTo see what licences you and others are using, you can use the following sequence of commands:\nmodule add idl/8.2 lmstat -a When interpreting the numbers, note that a single session is counted as 6 licences.\nUsing IDL on LOTUS (via the run-time Licences) \u0026nbsp; IDL run-time licences are available for use on the LOTUS cluster. In order to specify use of the run-time licences please follow the instructions here. You need to compile your IDL code in order to run in run-time mode.\nExample program \u0026nbsp; The example program, \u0026ldquo;foo\u0026rdquo;, depends on some other functions.\n======== foo.pro ======= pro foo print, doubleit(10) end ======================== ===== doubleit.pro ===== function doubleit, n return, two() * n end ======================== ======= two.pro ======== function two return, 2 end ========================You must save a compiled version of the code in order to run it.\n1. Compile the program:\nCompiles top-level routine only\n.compile foo % Compiled module: FOO. 2. Use resolve_all to compile routines it depends on:\nRecursively search for and compile modules called\nresolve_all % Compiled module: DOUBLEIT. % Compiled module: TWO. 3. Save all compiled routines to a file:\nsave, /routines, file=\u0026#39;foo.sav\u0026#39; 4. To run the program, using a run-time licence only:\nidl -rt=foo.sav IDL Version 8.4 (linux x86_64 m64). (c) 2014, Exelis Visual Information Solutions, Inc. Installation number: 406502. Licensed for use by: Science \u0026amp; Technology Facilities 20 \u0026nbsp; Using -vm= instead of -rt= opens the save file in the IDL virtual machine. No run-time licence is required, but a splash screen must be dismissed interactively, so it is not suitable for queues on the cluster. To see what routines are present in the save file:\n.reset_session \u0026lt;=== removes any existing compiled modules help \u0026lt;=== show compiled modules (and variables); there shouldn\u0026#39;t be any #% At $MAIN$ #Compiled Procedures: #$MAIN$ #Compiled Functions: restore,\u0026#39;foo.sav\u0026#39; \u0026lt;=== load contents of save file help % At $MAIN$ Compiled Procedures: $MAIN$ FOO \u0026lt;=== this was loaded from foo.sav Compiled Functions: DOUBLEIT TWO \u0026lt;=== so were these Passing arguments \u0026nbsp; You can also pass arguments in to your code as follows:\nIn your code, use function command_line_args, for example:\nargsarray = command_line_args(count = nparams)Call the code with -args flag:\nidl -rt=foo.sav -args 10 20 30 command_line_args returns a string array, so convert type as required, e.g. n = fix(argsarray[0]) Further reading \u0026nbsp; Vendor documentation: Using IDL\u0026nbsp; (although may be for a newer version than on JASMIN)"
      })
      .add(
      
      
      {
        id: 57,
        tag: "en",
        href: "/docs/short-term-project-storage/install-xfc-client/",
        title: "Install XFC client",
        description: "Install XFC client",
        
        
        content: "XFC client install \u0026nbsp; In order to initiate and manage your usage of the XFC (transfer cache) service, you need to use the XFC client.\nOnce set up, you don\u0026rsquo;t need to use this client to read/write data to XFC storage itself, but you can use it to interrogate the system to find out what data you have stored and how much of your quota(s) you are using.\nThe following steps should be used to create a python virtual environment and pip to install the xfc client:\nNOTE: do these steps on one of the sci (not xfer) servers:\nLog into one of the sci machines: e.g. sci1.jasmin.ac.uk (1 - 8 is available) The xfc client can be used with Python 3 using jaspy. module load jaspy Setup a virtual environment in your home directory:\npython -m venv ~/xfc_venv The following steps for Python 2 and Python 3 are now the same. Activate the virtual environment: source ~/xfc_venv/bin/activate Download the client software using git to your home directory: git clone https://github.com/cedadev/xfc_client.git pip install the xfc client pip install -e ~/xfc_client Use xfc on the command line xfc -h Users who already have a Python virtual environment can skip step 2 and install into an existing virtual environment.\nThe recommendation for users using NLA, XFC and JDMA is to create a single virtual environment to install all 3 client applications into.\nThe xfc client can be used without activating the python virtualenv by adding the path to the xfc client to the $PATH$ environment variable:\nexport PATH=\u0026#34;$PATH:~/xfc_venv/bin\u0026#34; ` echo \u0026#39;export PATH=\u0026#34;$PATH:~/xfc_venv/bin\u0026#34;\u0026#39; \u0026gt;\u0026gt; \u0026#34;$HOME/.bashrc\u0026#34; The xfc client can now be used by invoking xfc from the command line without activating the virtualenv. Python 3 users load jaspy using the command module load jaspy\nFor instructions on how to use the xfc client, see the article JASMIN Transfer Cache (XFC)."
      })
      .add(
      
      
      {
        id: 58,
        tag: "en",
        href: "/docs/interactive-computing/interactive-computing-overview/",
        title: "Interactive computing overview",
        description: "Interactive computing overview",
        
        
        content: "This article introduces the resources on JASMIN available for interactive computing (as opposed to batch computing). It covers:\nLogin servers Scientific Analysis servers Data Transfer Servers Project Specific Servers Login Severs \u0026nbsp; The login (also known as gateway or bastion) servers provide external* users with access to services inside of JASMIN.\n*external = outside of the STFC/RAL firewall.\nScientific Analysis Servers \u0026nbsp; The scientific analysis servers are the main resource for most users\u0026rsquo; everyday work. They have a standardised software environment and are ideal for development and testing of processing tasks which can then be submitted to the LOTUS batch processing cluster for larger processing runs.\nData Transfer Servers \u0026nbsp; General data transfer servers are provided for simple or smaller data transfer tasks. For larger data flows or where high performance is required, more sophisticated tools and services are available. Please read the guides in consult the data transfer category for more details.\nProject-Specific Servers \u0026nbsp; In some cases in the past, project requirements were not met by the general resources provided above and project-specific servers were provided. However these are now deprecated as in most cases, a tenancy in the JASMIN Cloud should provide what\u0026rsquo;s needed."
      })
      .add(
      
      
      {
        id: 59,
        tag: "en",
        href: "/docs/for-cloud-tenants/introduction-to-the-jasmin-cloud/",
        title: "Introduction to the JASMIN Cloud",
        description: "Introduction to the JASMIN Cloud",
        
        
        content: "In addition to the traditional batch computing (LOTUS) and storage (Group Workspaces) services, JASMIN also provides a cloud computing service.\nMany users will already be familiar with cloud services through the use of one of the large public providers (e.g. Amazon AWS or Microsoft Azure). The JASMIN Cloud is similar in that it allows an institution or project to consume compute resources as a utility, with no need to provision and maintain the associated physical infrastructure. Users can provision their own virtual machines (VMs) within the JASMIN infrastructure, allowing for greater flexibility. The JASMIN Cloud also allows users to provision clusters for Identity Management, Kubernetes, and Slurm clusters amongst others (see Cluster-as-a-Service).\nThe thing that makes the JASMIN Cloud unique is its colocation with the CEDA Archive and Group Workspaces. The JASMIN Cloud is ideally suited to projects that work with such data, and can enable novel solutions for the manipulation and presentation of data to end-users.\nCloud terminology \u0026nbsp; Different cloud providers have different terms for the users within their cloud and the chunks of resource they have been allocated. In the JASMIN Cloud documentation, we will use the following terminology:\nTenancy: An allocation of resources, i.e. virtual CPUs, RAM and block storage, within the cloud. Tenant: A group (institution or project) that has been allocated a tenancy in the cloud. Tenancy Admin(istrator): The person designated as the administrator of a tenancy. There would usually also be a deputy administrator. JASMIN Cloud Architecture \u0026nbsp; In order to provide as much flexibility as possible for tenants while preserving the security of the system, the JASMIN Cloud is split into two parts (see the schematic below). Both parts of the JASMIN Cloud are administered through the same self-service portal, allowing tenancy admins to provision VMs as required, within the quota of their tenancy.\njasmin cloud achitecture The JASMIN External Cloud is an Infrastructure-as-a-Service (IaaS) offering, and sits outside of the main JASMIN firewall. Tenants are allowed root access and have complete responsibility for all system administration tasks. This means that tenants are able to provision their own infrastructure (e.g. web portals, remote desktop services), but it also means that tenants are responsible for the security of their machines (e.g. patching, firewall configuration) and for managing their own users. Because it is outside of the JASMIN firewall, tenancies in the External Cloud cannot directly access the JASMIN storage (including PFS, and SOF), and so there is no filesystem level access to the CEDA Archive or Group Workspaces - all access to these data is via the usual external interfaces (i.e. the Object Store, FTP, OpenDAP, HTTP). We also have our Cluster-as-a-Service available to external cloud tenants which is a Platform-as-a-Service offering that tenants can use to deploy clusters including, an identity cluster, storage cluster (NFS), and a Kubernetes cluster.\nExternal Cloud patching policy \u0026nbsp; \u0026nbsp; We expect tenants to react in a timely manner to any security vulnerabilities. This means critical vulnerabilities are patched within 7 days, and high vulnerabilities are patched within 14 days. This is following UKRI security policy. Failure to comply may result in tenancy access being revoked and machines powered down. By contrast, the JASMIN Managed Cloud is a Platform-as-a-Service (PaaS) offering, sitting inside the main JASMIN firewall, meaning it can reach the JASMIN storage. In order to preserve security, this means that tenants are not allowed root access, and can only deploy VMs from a limited set of pre- approved templates. However, tenants are not responsible for the security of these machines, and users on VMs within the tenancy are JASMIN users. Currently, only two templates are available - an SSH bastion, or login machine, and a Scientific Analysis server with a similar configuration to the shared JASMIN Scientific Analysis servers. The Scientific Analysis servers have the CEDA Archive and Group Workspaces mounted.\nBoth offerings have a similar network structure. Each tenancy has its own local network, where machines have addresses in the 192.168.3.0/24 range - all machines in the tenancy can talk to each other on this network. In addition, each tenancy has an \u0026ldquo;edge device\u0026rdquo;, which is effectively a virtual router. Similarly to your home broadband router, this allows machines within the tenancy to talk to machines outside the tenancy, and ensures packets coming back into the tenancy are forwarded to the correct machine. These \u0026ldquo;edge devices\u0026rdquo; also provide a Network Address Translation (NAT) facility, which allows machines to be allocated an IP address that is visible outside of the tenancy. In the Managed Cloud, this translates to an IP address that is visible on the JASMIN network. In the External Cloud, it translates to an IP address that is visible on the public internet.\nExternal vs. Managed - pros and cons \u0026nbsp; Attribute Managed Cloud External Cloud Self-service provisioning Yes Yes Filesystem level access to JASMIN Storage (PFS, SOF) Yes No Root access No Yes Provision custom infrastructure SSH bastion or Scientific Analysis server only Build from generic Ubuntu or CentOS templates Security and patching Handled by infrastructure team Tenant\u0026rsquo;s responsibility User management JASMIN users Tenant\u0026rsquo;s responsibility Visibility to public internet No Yes (limited number of external IPs) Ability to provision Cluster-as-a-Service No Yes Getting a JASMIN Cloud Tenancy \u0026nbsp; To start a conversation with us about getting a JASMIN Cloud Tenancy for your project, please contact JASMIN Support."
      })
      .add(
      
      
      {
        id: 60,
        tag: "en",
        href: "/docs/for-cloud-tenants/jasmin-cloud-portal/",
        title: "JASMIN Cloud Portal",
        description: "JASMIN Cloud Portal",
        
        
        content: "The JASMIN Cloud Portal\u0026nbsp; is a web interface that enables the self-service provisioning of virtual machines in the JASMIN Cloud.\nCurrently, it is built on top of VMware VIO Horizon. Horizon is a powerful tool for provisioning cloud tenancies but is easy to misconfigure. The JASMIN Cloud Portal focuses on simplicity, allowing users to quickly provision the machines they require."
      })
      .add(
      
      
      {
        id: 61,
        tag: "en",
        href: "/docs/uncategorized/jasmin-conditions-of-use/",
        title: "JASMIN Conditions of Use",
        description: "JASMIN Conditions of Use",
        
        
        content: "Please refer to the JASMIN Terms and Conditions of Access"
      })
      .add(
      
      
      {
        id: 62,
        tag: "en",
        href: "/docs/interactive-computing/jasmin-notebooks-service/",
        title: "JASMIN Notebooks Service",
        description: "Jupyter Notebooks service on JASMIN",
        
        
        content: "The JASMIN Notebooks Service provides access to Jupyter Notebooks in the web browser.\nWhat is a Jupyter Notebook? \u0026nbsp; A Jupyter Notebook is an interactive document containing live code and visualisations that can be viewed and modified in a web browser. These documents can be shared, often using GitHub, and many projects distribute example code as Jupyter notebooks. Users interact with their notebooks using the open-source Jupyter Notebook server application.\nJupyter has support for many languages including Python, R, Scala and Julia, which are implemented by plugins known as \u0026ldquo;kernels\u0026rdquo;. The JASMIN Notebook Service currently provides one kernel - Python 3.10 with the latest Jaspy software environment installed. This environment is active by default, so there is no need for the module commands described in the linked article. You can also install and use your own Python environments as explained below.\nThe JASMIN Notebook Service uses JupyterHub to manage multiple Jupyter Notebook servers. After authenticating with a JASMIN account (with the correct access), a user gets access to their own notebook server. The notebook server runs as the authenticated user, and the user can access their home directory, Group Workspaces and CEDA Archive data as they would from a scientific analysis server.\nGetting access to the JASMIN Notebook Service \u0026nbsp; In order to access the JASMIN Notebook service, first, follow the steps in Getting started with JASMIN to get a JASMIN account and the jasmin-login service.\n\u0026nbsp; From 16/6/2021, access to the JASMIN Jupyter Notebook service is controlled simply by having a valid jasmin-login grant. 2-step verification is still required as shown below, but it is no longer necessary to apply for and be granted the additional jupyter-notebooks role, which is now deprecated. Using the JASMIN Notebook Service \u0026nbsp; To use the JASMIN Notebook Service, navigate to https://notebooks.jasmin.ac.uk. This will redirect you to the JASMIN Accounts Portal, where you should sign in with your JASMIN Account. If you have previously accessed the notebook service from the computer you are using, this may happen automatically.\nThe first time you access the JASMIN Notebook Service from a new computer or browser, you will be asked to verify your email address after signing in. To do this, make sure the \u0026ldquo;Email\u0026rdquo; method is selected and click \u0026ldquo;Send me a code\u0026rdquo;:\nSign in with 2-factor authentication This will result in an email being sent to your registered email address containing a six-digit verification code. Enter this code and press \u0026ldquo;Verify code\u0026rdquo;. Each code lasts between 15 and 30 minutes.\nUpon successfully signing in and verifying your email if required, you will be redirected back to the JASMIN Notebook Service. The service will then create a notebook server for you to use, and you will see a loading page:\nLoading page After a few seconds, or in some rare cases a minute or two, you will be taken to the JupyterLab interface:\nJupyterLab interface The folder shown in the left-hand panel will be your home directory on JASMIN, exactly as if you had logged in to a scientific analysis server. Any changes made in JupyterLab will be immediately reflected on the scientific analysis servers and LOTUS, and vice-versa. You can then launch, edit and run Python notebooks using the JupyterLab interface. Notebooks can access files from the CEDA Archive, and also have read-only access to group workspaces. For example, this notebook reads a file belonging to the CCI project from the CEDA Archive and plots the data on a map:\nExample notebook A full discussion of the power of the JupyterLab interface is beyond the scope of this documentation, but the JupyterLab documentation is excellent, and there are many tutorials available on the internet.\nIntended usage and limitations \u0026nbsp; The JupyterLab environment provided by the JASMIN Notebooks Service is powerful, but it has some limitations that reflect the type of usage that we want to encourage.\nThe JASMIN Notebooks Service is primarily intended for interactively producing visualisations of existing data, not for processing vast amounts of data. As such, the resources made available to each notebook server are limited.\nFor larger processing tasks with Notebooks, users should consider using the JASMIN Dask Gateway service\u0026nbsp; , which provides an easy way for processing managed from within a Jupyter Notebook to be scaled out to multiple LOTUS jobs in parallel.\nAlternatively, use the LOTUS batch processing cluster separately, before using the notebooks service to visualise the output.\nDoing this means that the bulk of the resource usage will be shared by the LOTUS cluster rather than the Notebooks service itself.\n\u0026nbsp; Although it was previously the case that Group Workspaces were only available in Notebooks read-only, this is no longer the case (as of 2023), so you should have full read-write access to any group workspace volume. Common issues and questions \u0026nbsp; I get \u0026ldquo;403 forbidden\u0026rdquo; when I try to access the JASMIN Notebook Service \u0026nbsp; This error occurs when you do not have the correct permissions to access the JASMIN Notebook service. Please ensure you have been granted the jasmin-login and allow some time for the changes to propagate through the system.\nWhich software environment is used by the Notebook Service? \u0026nbsp; The JASMIN Notebook Service currently uses the default Jaspy environment listed on the Jaspy page.\nCan I install additional packages? \u0026nbsp; The recommended way to do this is to create your own virtual environment in the notebooks service and install additional packages into that. You can make that virtual environment persist as a kernel to use again next time you use the Notebooks service.\nIf you believe that the package is more widely applicable, you can request an update to Jaspy.\nCan I use a different software environment? \u0026nbsp; Yes, the article linked above also describes how to use Conda to create your own custom environment.\nI get \u0026ldquo;503 service unavailable\u0026rdquo; when I try to access the JASMIN Notebook \u0026nbsp; Service\nThis error occurs when your notebook server is unable to start. By far the most common cause of this error is when you are over your quota in your home directory. As part of starting up, Jupyter needs to create some small files in your home directory in order to track state. When it is unable to do this because you are over your quota, you will see the \u0026ldquo;503 service unavailable\u0026rdquo; error.\nIf you see this error, try connecting to JASMIN using SSH and checking your home directory usage. After clearing some space in your home directory, your notebook server should be able to start again.\nI get the following message when my notebook is queued for spawning \u0026nbsp; Error message The message above indicates that the Notebook service is oversubscribed -busy- and there are no resources available to start your Notebook server. Please try again later!\nPlease use the scientific analysis server and LOTUS for processing and Jupyter Notebook for lighter visualisation.\nExample Notebooks \u0026nbsp; In support of the JASMIN Notebook Service, we have developed a GitHub repository with a collection of Notebooks that demonstrate some of the important features of the service. The following provides a general introduction:\nhttps://github.com/cedadev/ceda-notebooks/blob/master/notebooks/training/intro/notebook-tour.ipynb\nOther Notebooks can be found within the repository, under:\nhttps://github.com/cedadev/ceda-notebooks/tree/master/notebooks\nWebinar / video tutorial \u0026nbsp; A CEDA webinar on 16th June 2020 demonstrated how to use the service. A recording of the event is available:\nFurther info \u0026nbsp; Here are a set of links to learn more about Jupyter Notebooks and the JASMIN Notebook Service:\nThe JASMIN Notebook Service Intro to Jupyter Lab Try a Jupyter Lab Notebook in your browser (this link does not use the JASMIN Notebook Service) Tour of the JASMIN Notebook Service - set of notebooks highlighting different features Intro to the JASMIN Notebook Service - video of a webinar from June 2020 Instructions to create a Python virtual environment - example notebook Instructions to create a Conda environment for use with the Notebook Service - example notebook"
      })
      .add(
      
      
      {
        id: 63,
        tag: "en",
        href: "/docs/software-on-jasmin/software-migration-2020/",
        title: "JASMIN software changes: migration to CentOS7 (2020)",
        description: "JASMIN software changes: migration to CentOS7 (2020)",
        
        
        content: "\u0026nbsp; This article is now out of date, but a similar exercise is about to get underway for the migration of the JASMIN platform from CentOS7 operating system (end of life June 2024) to Rocky Linux 9. Look out for futher details in due course. Introduction \u0026nbsp; This article explains the changes in the provision of common software on JASMIN (\u0026ldquo;sci\u0026rdquo; servers and LOTUS) when upgrading to main operating system from RedHat Enterprise Linux 6 (RHEL6) to CentOS7. It answers for the following questions:\nWhat is changing? \u0026nbsp; The upgrade from RHEL6 to introduces a new way of working with software environments on JASMIN.\nThe previous system involved installations via RPM using a collection of packages known as the \u0026ldquo;JASMIN Analysis Platform\u0026rdquo; (JAP).\nThe current system uses two approaches to providing software environments and packages:\nJaspy environments – a collection of software environments that you can \u0026ldquo;activate\u0026rdquo; for use. \u0026ldquo;jasmin-sci\u0026rdquo; environment – a single set of software packages installed separately because they were difficult to include in Jaspy. Which systems are affected? \u0026nbsp; This change applies to all generally available JASMIN servers and the LOTUS cluster. These include:\njasmin-sci* cems-sci* jasmin-cylc cron All LOTUS nodes (accessed via LSF) Why is it changing? \u0026nbsp; The reason for moving away from the JAP was to provide a system that could support multiple versions of software packages, and environments, on a single platform. From the perspective of reproducible science, the Jaspy approach is more useful because it:\nkeeps previous environments on the system when a new version of an environment is launched includes a listing of all packages (and their versions) that are provided in each date-stamped software environment From a management point-of-view, Jaspy builds on the packaging tool \u0026ldquo;conda\u0026rdquo; and the community repositories known as \u0026ldquo;conda-forge\u0026rdquo;. These tools are widely used in the scientific community and provide many components that are re-used in Jaspy.\nComparison of packages in old JASMIN Analysis Platform and new Jaspy/\u0026ldquo;jasmin-sci\u0026rdquo; environments \u0026nbsp; Most packages that were previously provided as part of the JASMIN Analysis Platform (JAP) are now included in Jaspy environments or the \u0026ldquo;jasmin-sci\u0026rdquo; environment. Some packages have however been dropped. The treatment of certain packages is documented on the \u0026ldquo;extra-sci- packages\u0026rdquo; GitHub repository. A full table of packages that were in JAP and their mappings to Jaspy/\u0026ldquo;jasmin- sci\u0026rdquo; is provided below.\nHow do I get started (quickly)? \u0026nbsp; If you want to access most of the packages you can find them in the most recent Jaspy environment. This can be activated using:\nmodule load jaspyIf you need packages that are provided in the \u0026ldquo;jasmin-sci\u0026rdquo; environment then you can activate it using:\nmodule load jasmin-sci Full table of packages from JAP \u0026nbsp; Here is a full table of packages that were provided via JAP, and how they are provided for use on CentOS7 machines (as of initial release).\nIn the summary column:\nC - package is provided via Conda environment (i.e. Jaspy) R - package is provided via an RPM (as part of the base OS or via jasmin-sci) CR - package is provided both via Jaspy and via an RPM. The version in Jaspy is recommended for use with user code; the RPM version is also installed in order to satisfy an RPM dependency only, and may be subject to change. N - not provided (mostly these have been deprecated by the third-party sources) NAME (in JAP) Version in Jaspy 3.7 (conda) Version in Jaspy 2.7 (conda) Version in RPMs (base or jasmin-sci SCL) Summary: (C)onda/ (R)PM / (N)one Comments arpack 3.6.3 3.6.3 C atlas 3.8.4 3.10.1 R atlas-devel 3.8.4 3.10.1 R bbcp N deprecated bbcp-config N deprecated blas 1.1 1.0 C boost-devel 1.70.0 C cdo 1.9.5 C cmip6-cmor-tables N groups advised to maintain own CMOR cmor-libs N groups advised to maintain own CMOR coda 0.19_1 C ddd 3.3.12 R diffuse 0.4.8 R dvipng 1.14 R package texlive-dvipng-svn26689 eccodes 2.9.2 C eccodes-devel 2.9.2 C eccodes-fortran 2.9.2 C eccodes-python27 2.9.2 C emacs 26.1 24.3 R emacs is broken in jaspy 2.7 - /usr/bin/emacs may be required to override emacs-common-ess N might provide later emacs-ess N might provide later emacs-ess-el N might provide later emacs-gnuplot 4.6.2 R emos N deprecated esmf 7.1.0r 7.1.0r C esmf-doc N See here and ESMF_refdoc esmf-python27 7.1.0r 7.1.0r C ferret 7.5.0 R fftw 3.3.8 3.3.8 C fftw-devel 3.3.8 3.3.8 C firefox N flex-devel 2.6.4 C gcc-gfortran 4.8.5 R gdal 2.2.4 2.0.0 C gdal-devel N gdal provided as \u0026ldquo;gdal\u0026rdquo; gdal-doc N gdal provided as \u0026ldquo;gdal\u0026rdquo; gdal-java N gdal-javadoc N gdal-libs N gdal-perl N gdal-python27 2.2.4 2.0.0 C geany 1.31 R geos 3.6.2 3.7.1 C geos-devel 3.6.2 3.7.1 3.4.2 R git 2.20.1 2.20.1 C gitk 1.8.3.1 R glibc-static 2.17 R gnuplot 4.6.2 R grads 2.0.2 R GraphicsMagick-c++ 1.3.32 R graphviz 2.38.0 2.38.0 C graphviz-gd N graphviz-python27 2.38.0 2.38.0 C grass 6.4.4 R grass-devel 6.4.4 R grass-libs 6.4.4 R grib_api N deprecated - use eccodes grib_api-devel N deprecated - use eccodes grib_api-fortran N deprecated - use eccodes grib_api-python27 N deprecated - use eccodes gsl 2.2.1 2.5 C gsl-devel 2.2.1 2.5 C gsl-static 2.2.1 2.5 C gtk2 2.24.31 C gtk2-devel 2.24.31 C gv 3.7.4 R hdf 4.2.13 4.2.13 C hdf-devel 4.2.13 4.2.13 C hdf5 1.10.3 1.10.1 C hdf5-devel 1.10.3 1.10.1 C hdfeos2 2.2 2.20 20.1.00 CR hdfeos5 5.1.16 5.1.16 C ImageMagick 7.0.8_16 7.0.8_10 C JAGS N available as \u0026ldquo;rjags\u0026rdquo; jasper-devel 1.900.1 2.0.14 C ksh 20120801 R lapack 3.6.1 3.6.1 C lapack-devel 3.6.1 3.6.1 C leafpad 0.8.18 R libcdms 3.1.0 3.0.1 C libcrayutil 20121128 R libcurl-devel 7.29.0 R libdrs 3.1.0 3.1.0 3.1.2 CR libuuid-devel 2.32.1 2.32.1 2.23.2 CR llvm-devel 3.3 C lxterminal 0.3.2 R mercurial 4.9.1 2.6.2 R mo_unpack 2.0.1 R mtk 1.4.5 R mtk-devel 1.4.5 R mtk-python27 N see build instructions for user ncBrowse N deprecated nccmp 1.8.3.1 R ncl 6.5.0 C nco 4.7.8 C nco-devel 4.7.8 C ncview 2.1.2 R nedit 5.7 R netcdf 4.6.1 4.6.1 4.3.3.1 CR called libnetcdf in conda netcdf-c++ 4.2.1 4.3.0 C called netcdf-cxx4 in conda netcdf-c++-devel 4.2.1 4.3.0 C called netcdf-cxx4 in conda netcdf-devel 4.6.1 4.6.1 4.3.3.1 CR called libnetcdf in conda netcdf-fortran 4.4.4 4.4.4 4.2 CR netcdf-fortran-devel 4.4.4 4.4.4 4.2 CR octave 3.8.2 R octave-devel 3.8.2 R octave-doc N docs are on https://octave.org/doc/ octave-netcdf 1.0.6 R octave-octcdf N deprecated p7zip 16.02 R parallel 20190522 C pdftk N discontinued perl-core 5.16.3 R perl-devel 5.16.3 R perl-Image-ExifTool 11.7 R perl-XML-Parser 2.44_01 C postgresql-devel 9.2.24 R proj 4.9.3 5.2.0 4.8.0 CR called proj4 in conda proj-devel 4.9.3 5.2.0 4.8.0 CR called proj4 in conda proj-epsg 4.9.3 5.2.0 4.8.0 CR called proj4 in conda proj-nad 4.9.3 5.2.0 4.8.0 CR called proj4 in conda proj-static 4.9.3 5.2.0 4.8.0 CR called proj4 in conda python27 3.7.1 2.7.15 C python27-alabaster 0.7.12 0.7.12 C python27-astral 1.9.2 C python27-Babel 2.6.0 2.7.0 C python27-backports-common 1.0 C python27-backports-functools_lru_cache 1.5 C python27-backports-ssl_match_hostname 1.0 C python27-basemap 1.2.0 1.2.0 C python27-biggus 0.15.0 C python27-boto3 1.9.67 1.9.188 C python27-botocore 1.12.68 1.12.188 C python27-cartopy 0.17.0 0.16.0 C python27-ccplot P python27-cdat_lite N deprecated python27-cerbere N python27-certifi 2018.11.29 C python27-cf 2.3.6 C called cf-python in conda python27-cf-checker 3.1.1 C python27-cf-plot 2.4.10 C python27-cf-units 2.0.2 2.1.1 C python27-cf-view N no longer supported python27-cftime 1.0.3.4 1.0.1 C python27-chardet 3.0.4 3.0.4 C python27-cis 1.6.0 C python27-cloudpickle 0.6.1 1.2.1 C python27-cmor N groups advised to maintain own CMOR python27-cycler 0.10.0 0.10.0 C python27-Cython 0.29.2 0.29.12 C python27-dask 1.0.0 1.2.2 C python27-dateutil C As \u0026ldquo;dateutil\u0026rdquo; python27-descartes 1.1.0 1.1.0 C python27-docutils 0.14 0.14 C python27-ecmwf-api-client N To be added soon. python27-emcee 2.2.1 2.2.1 C python27-enum34 1.1.6 C python27-eofs 1.3.1 1.4.0 C python27-esgf-pyclient 0.1.8 C python27-filelock 3.0.10 3.0.10 C python27-Fiona 1.7.13 C python27-geopandas 0.4.0 C python27-h5py 2.8.0 2.8.0 C python27-httplib2 0.13.0 C python27-idna 2.8 2.8 C python27-ilamb 2.3.1 C python27-ImageHash 4.0 4.0 C python27-imagesize 1.1.0 1.1.0 C python27-ipython 7.2.0 5.8.0 C python27-iris_sample_data 2.1.0 2.1.0 C python27-iris-grib 0.12.0 C python27-jinja2 2.1 2.10.1 C python27-jmespath 0.9.3 0.9.4 C python27-joblib 0.13.0 0.13.2 C python27-Jug 1.6.7 1.6.8 C python27-kiwisolver 1.0.1 1.1.0 C python27-latexcodec 1.0.5 1.0.7 C python27-locket 0.2.0 0.2.0 C python27-MarkupSafe 1.1.0 1.1.1 C python27-matplotlib 3.0.2 2.2.2 C python27-mo_pack 0.2.0 0.2.0 C python27-mock 2.0.0 3.0.5 C python27-mpi4py-mpich 3.0.1 C python27-mpmath 1.1.0 1.1.0 C python27-nappy 1.1.4 1.2.1 C python27-nc-time-axis 1.1.0 1.1.0 C python27-netCDF4 1.4.2 1.3.1 C python27-nose 1.3.7 1.3.7 C python27-numpy 1.15.4 1.15.4 C python27-packaging 18.0 19.0 C python27-pandas 0.23.4 0.24.2 C python27-partd 0.3.9 1.0.0 C python27-patsy 0.5.1 0.5.1 C python27-pep8 1.7.1 1.7.1 C python27-Pillow 5.3.0 5.2.0 C python27-psutil 5.4.8 5.6.3 C python27-psycopg2 2.7.6.1 2.7.7 C python27-pybtex 0.22.0 0.22.2 C python27-pycairo 1.18.0 1.16.3 C python27-pycodestyle 2.4.0 2.5.0 C python27-Pydap 3.2.2 3.2.2 C python27-pygeode 1.2.2 C python27-Pygments 2.3.1 2.4.2 C python27-pygobject2 3.28.3 C pygobject in conda python27-pygrib 2.0.3 2.0.2 C python27-pygtk2 C python27-pygtk2-libglade N python27-pyhdf 0.9.10 0.10.1 C python27-pyke 1.1.1 1.1.1 C python27-pyparsing 2.3.0 2.4.0 C python27-pyproj 1.9.5.1 1.9.6 C python27-pyshp 2.0.0 2.1.0 C python27-pyside 5.6.0a1 C python27-pyspharm 1.0.9 1.0.9 C python27-pystan 2.17.1.0 2.17.1.0 C python27-pytz 2018.7 2019.1 C python27-pyugrid 0.3.1 0.3.1 C python27-PyYAML 3.13 5.1.1 C python27-pyzmq 17.1.2 18.0.2 C python27-requests 2.21.0 2.22.0 C python27-rpy2 2.9.4 2.8.5 C python27-s3transfer 0.1.13 0.2.1 C python27-ScientificPython N only available in Python2.7 python27-scikit-image 0.14.2 C python27-scikit-learn 0.20.1 0.20.3 C python27-scipy 1.1.0 1.1.0 C python27-scitools-iris 2.2.0 1.13.0 C python27-seaborn 0.9.0 C python27-setuptools 40.6.3 41.0.1 C python27-Shapely 1.6.4 1.6.4 C python27-singledispatch 3.4.0.3 C python27-six 1.12.0 1.12.0 C python27-snowballstemmer 1.2.1 1.9.0 C python27-Sphinx 1.8.2 1.8.5 C python27-sphinxcontrib-websupport 1.1.0 1.1.2 C python27-statsmodels 0.9.0 0.10.0 C python27-sympy 1.3 1.4 C python27-Theano 1.0.3 1.0.4 C python27-toolz 0.9.0 0.10.0 C python27-tornado 5.1.1 5.1.1 C python27-tqdm 4.28.1 4.32.2 C python27-typing 3.7.4 C python27-urllib3 1.24.1 1.25.3 C python27-virtualenv 16.0.0 16.0.0 C python27-WebOb 1.8.4 1.8.5 C python27-windspharm 1.7.0 1.7.0 C python27-wxPython 4.0.3 4.0.3 C python27-xarray 0.11.0 0.11.3 C qt-devel 4.8.7 R R 3.5.1 3.4.1 C R-devel 3.5.1 3.4.1 C R-ncdf4 1.16 1.16 C redhat-lsb 4.1 R rjags 4_6 C sqlite-devel 3.7.17 R subversion 1.8.17 R subversion-devel 1.8.17 R subversion-tools 1.8.17 R tcl-devel 8.5 R tcl-devel 8.5.13 R tcsh 6.18.01 R thea N discontinued tk 8.6.9 8.6.9 8.5.13 CR tk-devel 8.6.9 8.6.9 8.5.13 CR tkdiff 4.3.5 R tmux 2.7 2.7 C tree 1.6.0 R udunits-devel 2.2.27.6 2.2.27.6 2.2.20 R called udunits2-devel umutil 20130102 R umutil-lib 20130102 R uuid 1.6.2 R uuid-devel 1.6.2 R valgrind 3.15.0 C vim-enhanced 7.4.629 R wxGTK-devel 2.8.12 R xconv 1.94 R xemacs 21.5.34 R xorg-x11-util-macros 1.19.0 R xpdf 3.04 R"
      })
      .add(
      
      
      {
        id: 64,
        tag: "en",
        href: "/docs/software-on-jasmin/jasmin-software-faqs/",
        title: "JASMIN software FAQs",
        description: "JASMIN software FAQs",
        
        
        content: "Why do I have to load/activate a software environment? We have a range of different users on JASMIN who work on many different projects. Each project has its own software requirements and timeline. By providing multiple software environments (such as Python2.7 and Python3.7) we can support a wider range of users on the same platform. Since we do not assume a \u0026ldquo;standard\u0026rdquo; environment it is up to the user to \u0026ldquo;load\u0026rdquo; (or \u0026ldquo;activate\u0026rdquo;) a software environment before usage. This is typically done by using:\nmodule load \u0026lt;environment\u0026gt; See the overview page for more details.\nHow do I set the Jaspy environment as my default? If you want your JASMIN sessions to automatically use the default \u0026ldquo;jaspy\u0026rdquo; environment then append this line to the end of your \u0026ldquo;$HOME/.bashrc\u0026rdquo; file:\nmodule load jaspy How do I set the `jasmin-sci` environment as my default? If you want your JASMIN sessions to automatically know about the packages in the \u0026ldquo;jasmin-sci\u0026rdquo; environment then add this line to the end of your \u0026ldquo;$HOME/.bashrc\u0026rdquo; file:\nmodule load jasmin-sci How do I activate a combination of Jaspy and `jasmin-sci` environments together? If you want to activate (or load) both the current Jaspy and the \u0026ldquo;jasmin-sci\u0026rdquo; environments at the same time, use:\nmodule load jasmin-sci module load jaspy What is the plan for the future of Jaspy and `jasmin-sci` environments? We have moved over to using Conda as the primary tool for building and deploying software environments. The Jaspy environments are all Conda-based and make use of the significant community efforts supporting scientific computing such as the \u0026ldquo;conda-forge\u0026rdquo; repositories. For some packages, not available through Conda, we have also created the \u0026ldquo;jasmin-sci\u0026rdquo; environment. Ideally, we would like to move to a Conda-only solution in order to simplify both the management and user perspectives. Can I install my own Conda environment? If you need to install a set of packages that are not provided in Jaspy or the \u0026ldquo;jasmin-sci\u0026rdquo; environment then you can create your own Conda installation. It is important to note that this will not be compatible with the Jaspy environments and please take note of the FAQ below: \u0026ldquo;Where should I install software environments on JASMIN?\u0026rdquo;. Where should I install software environments on JASMIN? If you need to install your own software environment(s) on JASMIN then we strongly advise that you install it on one of the SSD file systems:\nUnder your $HOME directory - if you are the only user who needs access. Within a \u0026ldquo;small files\u0026rdquo; Group Workspace - if you wish to share the environment with other JASMIN users. Is MATLAB available on JASMIN? No, MATLAB is not one of our supported software packages and is not installed on JASMIN for general use. As a result, we are not able to provide support for MATLAB-related issues.\nAn alternative is Gnu Octave, which is a ‘drop-in’ replacement for MATLAB, and can be used on LOTUS without license restrictions.\nSome users/groups have arranged their own MATLAB license to be available for use in certain locations on JASMIN, but this is something which users/groups would need to arrange for themselves with the vendor, Mathworks.\nIf you do have your own license, please be aware that any installation of MATLAB would need to be done in a location that meets the terms of the license, and the installation would normally need to be carried out with regular user permissions (JASMIN users do not have root or sudo permissions).\nThere are 2 places where it would be OK to install MATLAB in this case:\nWithin a group workspace, with access restricted to members of the group, but available for use on one of the shared sci machines (but see note below) On a tenancy sci machine: this is a special type of sci server deployed within a JASMIN Cloud tenancy, for exclusive use by members of that tenancy. The manager of the tenancy should do the installation. Safe use of temporary directories if using MATLAB on JASMIN\nBy default, Matlab makes use of the local /tmp area on the machine where it is being used, so if this is on a shared machine, it can fill up the /tmp area and cause issues for all other users of the machine. You are therefore advised to create and use a subdirectory of a group workspace instead of /tmp for your own TMPDIR area. To do this, please do the following (or similar):\nThe following lines added to your $HOME/.bashrc file will set an environment variable TMPDIR, and create the corresponding directory if it does not already exist:\nexport TMPDIR=/gws/\u0026lt;path_to_your_group_workspace\u0026gt;/\u0026lt;your_username\u0026gt;/tmp [ -d $TMPDIR ] || mkdir -p $TMPDIRThis should get automatically set at login, or can be manually invoked with:\n. ~/.bashrc But please note that we are not able to help with MATLAB queries beyond the information provided here."
      })
      .add(
      
      
      {
        id: 65,
        tag: "en",
        href: "/docs/getting-started/jasmin-status/",
        title: "JASMIN status",
        description: "JASMIN status",
        
        
        content: "This article lists sources of information about the status of JASMIN services.\nCEDA Status page \u0026nbsp; The CEDA Status page\u0026nbsp; is updated regularly to announce or track current and upcoming incidents which may affect JASMIN and CEDA services. Please check for known incidents or announced shceduled maintenance before contacting the helpdesk.\nJASMIN dashboard \u0026nbsp; The JASMIN metrics dashboard\u0026nbsp; has been redeveloped and is now available again.\nPlease read the introductory information on that page.\nCurrrently it provides:\nGWS Dashboard view of all the volumes in a group workspace across different storage types, showing quota and usage LOTUS Dashboard showing pending and running jobs per partition (queue) and other useful metrics Power Dashboard showing power consumption of the various components of JASMIN Tape dashboard showing summary information on tape usage by consortium This is still under active development and further dashboards may be added in due course.\nPlease also keep an eye on:\nJASMIN-USERS email list (all users should be on this list. If not, please ask) CEDA News\u0026nbsp; articles on the CEDA website @cedanews on X (formerly Twitter)\u0026nbsp;"
      })
      .add(
      
      
      {
        id: 66,
        tag: "en",
        href: "/docs/getting-started/jasmin-training-accounts/",
        title: "JASMIN training accounts",
        description: "JASMIN training accounts",
        
        
        content: "What are training accounts? \u0026nbsp; JASMIN training accounts are TEMPORARY accounts that provide a person with access to JASMIN for a specific event (such as a training workshop) organised in advance.\nThe benefits of using these accounts are:\npermissions/services are consistent across all training accounts these permissions include (but are limited to) those normally anticipated for use within training/hackathon events they provide access to someone who may not be eligible for a full account - setting up access for multiple users in advance of an event is more efficient for all involved than the usual registration process When should they be used? \u0026nbsp; By participants of training events led by the JASMIN team (By special arrangement with the event organiser) by participants of other events such as training workshops or hackathons which require temporary access to JASMIN In both cases, use of the training accounts is only for the duration of the event. Use beyond the event requires the normal registration process.\nWho can request these accounts? \u0026nbsp; Organisers of training events / hackathons, by contacting the JASMIN team. For event organisers \u0026nbsp; How to request training accounts for your event \u0026nbsp; If you think these accounts could be useful for you, please contact the helpdesk with the following information:\nName/date of event\nEstimated number of attendees (note: we only have 150 such accounts, and events sometimes overlap)\nWhat services the accounts will need access to e.g. sci machines, GWS, CEDA Archive, Notebook Service, Transfer Servers, LOTUS, or any other special services on JASMIN\nAny special requests for accessing resources\nBy default, the training accounts have access to the following services. Any request for other services beyond these would need to be considered by the JASMIN team: Login, nx-login, sci and xfer servers hpxfer service workshop group workspace (/gws/pw/j07/workshop) use of LOTUS via the workshop Slurm queue Jupyter Notebooks service (requires users to set password) Once the JASMIN team have confirmed that we can support your event, you will need to collect and supply the following at least 2 weeks before your event:\nEmail addresses for all attendees who need a training account. These addresses cannot already be associated with an existing JASMIN account. They must be different. Please note that we cannot guarantee the following during your event:\nno login problems uptime of services no problems due to usage at scale (particularly for use of sci servers and/or Notebook Service) What to tell your event attendees \u0026nbsp; The JASMIN team will set up the accounts and send credentials to attendees approximately 1 week before your event.\nPlease ensure you have given the following information to attendees:\nA link to this help page. Tell them all information they need is under the \u0026lsquo;for event attendees\u0026rsquo; section. Tell users what services they have been granted access to (see above) and any additional information e.g. full path to any GWSs, whether they will need to use the JASMIN Notebook Service or accounts portal. Tell the users when the training accounts will be closed down. This is usually within 24 hours of the end of the event. They would be responsible for copying any important data and/or code elsewhere if it is important that these are not lost when the accounts are wiped. For event attendees \u0026nbsp; How to set up your temporary account \u0026nbsp; Training account credentials will be emailed to you via OneDrive. Sometimes the OneDrive email ends up in junk/spam folders, please check here. If you still can\u0026rsquo;t find the email, please contact the helpdesk ASAP. To access the training account credentials, you must: Click on the OneDrive link. Enter your email address (if you already have a JASMIN account, this will be the alternative email address you provided). If you are having difficulty opening the link, please sign out of any alternative OneDrive accounts and then try again. You will then be emailed a verification code. Enter this code on OneDrive. Download the files. These contain your training account credentials. Next, you need to use these training account credentials to set up your own machine for accessing JASMIN. Follow the instructions in Ex00. You MUST do this before your event. You may need access to the JASMIN Notebook Service and Accounts Portal. Your event organiser will let you know whether this is needed for your particular event. If you do need it, you will need to follow the steps in the section below. For the JASMIN Beginners workshop: you do not need this. For the JASMIN Advanced workshop: you do need this. Please follow the steps in the section below. Before the event, familiarise yourself with the JASMIN help documentation site. This should answer most questions you may have. If you are attending a 3rd-party-led event, we suggest taking a look at the [other JASMIN workshop training materials](https://github.com/cedadev/jasmin- workshop) - especially if you are a new user. Your event organiser should provide full details of how the training account should be used for that particular event - please contact them if you have any issues.\nJASMIN Notebook Service and Accounts Portal access \u0026nbsp; Access to these services requires a password. This is not sent in the OneDrive link. If you need access to these services, you must:\nGo to the Reset Account Password function of the JASMIN Accounts portal Enter your email address (NB: the one to be used for the training account) You will then receive a password reset email (don’t forget to check your spam folder). Follow the steps to reset the password. You can now use this new password for accessing the notebook service and the accounts portal."
      })
      .add(
      
      
      {
        id: 67,
        tag: "en",
        href: "/docs/software-on-jasmin/jaspy-envs/",
        title: "Jaspy Software Environments (Python 3, R and other tools)",
        description: "Jaspy Software Environments (Python 3, R and other tools)",
        
        
        content: "This page provides details of the \u0026ldquo;Jaspy\u0026rdquo; software environments that provide access to Python 3, R and a range of other tools on JASMIN.\nOverview \u0026nbsp; Jaspy is a toolkit for managing and deploying Conda environments that include Python, R and other packages. Jaspy is used to provide software environments of common packages on the scientific analysis servers and LOTUS cluster on JASMIN.\nOne advantage of Jaspy is that multiple environments can co-exist on the same platform. This allows us to retain previous environments and provide new ones simultaneously. This may be particularly useful for scientists undertaking long-running studies that require a consistent software environment to ensure reproducibility and continuity.\nWorking with Jaspy environments \u0026nbsp; Quickstart for Python 3 environment \u0026nbsp; If you want to get on, you can select a Jaspy environment to \u0026ldquo;activate\u0026rdquo;. This means that once you have run these commands then the various tools and libraries will be available in your current session.\nmodule load jaspy Activating the environment in scripts \u0026nbsp; If you want a particular script to activate a Jaspy environment then add the \u0026ldquo;module\u0026rdquo; command to it, e.g.:\n#!/bin/bash module load jaspy python do-something.py Setting your profile to always use a Jaspy environment \u0026nbsp; If you want all your JASMIN sessions to use a particular Jaspy environment then you can add the module load jaspy command to your $HOME/.bashrc file. In order to avoid issues with using \u0026ldquo;module load\u0026rdquo; on unsupported servers, please wrap the call in an \u0026ldquo;if\u0026rdquo; clause, such as:\nif [[ $(hostname) =~ (sci[0-9]|host[0-9]|cylc) ]] ; then module load jaspy fi Discover which environments are available \u0026nbsp; You can list the currently available Jaspy environments using:\nmodule avail jaspy ------------------------- /apps/modulefiles ---------------------------- jaspy/2.7/r20190715 jaspy/3.7/r20200606 jaspy/3.10/r20230718 (D) jaspy/3.7/r20181219 jaspy/3.7/r20210320 jaspy/3.11/r20240302 jaspy/3.7/r20190612 jaspy/3.8/r20211105 jaspy/3.11/r20240508 jaspy/3.7/r20190627 jaspy/3.10/r20220721 This lists all jaspy modules (i.e. environments) that can be loaded.\nJaspy Python 3.7+ (plus other tools) environments \u0026nbsp; The packages available in the Jaspy environments can be found by searching the GitHub repository where the Conda environment files are defined. This table lists all the Jaspy Python 3.7+ environments provided on JASMIN and specifies the current (default) version.\nJaspy Python 3.7 Environment Versioned list of software packages Default? Comments / Issues jaspy/3.11/r20240508 List of packages including versions No (will become the default on 22/05/2024) Release notes jaspy/3.11/r20240302 List of packages including versions No Release notes jaspy/3.10/r20220721 List of packages including versions Yes (from: 18/10/2022) NCO and NCL have now been moved to the \u0026ldquo;jasmin-sci\u0026rdquo; packages installation. jaspy/3.8/r20211105 List of packages including versions No (was default: 16/11/2021 - 17/102022) Known problem with NCL rendering Shapefiles (see issue). Some packages were removed in this release due to dependency problems: theano, pymc3, pystan, pyngl,pyferret (seeissue). jaspy/3.7/r20210320 List of packages including versions No (was default: 20/05/2021 - 16/11/2021) Known problem with NCL rendering Shapefiles (see issue) jaspy/3.7/r20200606 List of packages including versions No jaspy/3.7/r20181219 List of packages including versions No Jaspy Python 2.7 (plus other tools) environments \u0026nbsp; This table lists all the Jaspy Python 2.7 environments provided on JASMIN and specifies the current (default) version.\nJaspy Python 2.7 Environment Versioned list of software packages Default? jaspy/2.7/r20190715 List of packages including versions Yes Jasr R environments \u0026nbsp; Environments for the \u0026ldquo;R\u0026rdquo; programming language are packaged into separate software environments, known as \u0026ldquo;Jasr\u0026rdquo;. This table lists all the Jaspy R environments provided on JASMIN and specifies the current (default) version.\n\u0026nbsp; We are aware of a newly discovered vulnerability in the R Language (CVE-2024-27322) which allows arbitrary code execution from maliciously built RDS (R Data Serialisation) files.\nWe will be updating to the latest version of R as soon as possible to remove this vulnerability, but we do not plan to remove access to R beforehand. Our advice, as always, is to not open data from untrusted sources and not to install untrusted packages from CRAN.\nPlease note that this position may change at short notice as more information becomes available- this notice was last updated on Friday 10th May 2024.\nJaspy R Environment (\u0026ldquo;Jasr\u0026rdquo;) Versioned list of software packages Default? jasr/4.3/r20240320 List of packages including versions No (will become the default on 16/04/2024) jasr/4.0/r20220729 List of packages including versions Yes (from: 18/10/2022) jasr/4.0/r20211110 List of packages including versions No (was default: 16/11/2021 - 17/10/2022) The available R environments can be listed with:\nmodule avail jasr Understanding versioning with Jaspy/Jasr \u0026nbsp; Jaspy environments are labelled as \u0026ldquo;jaspy/\u0026lt;python_version\u0026gt;/\u0026rdquo;. The environment is selected and activated using the \u0026ldquo;module load\u0026rdquo; command:\nmodule load jaspy/3.7/r20210320 However, if you wish to get the latest environment for a given Python version you can omit the \u0026ldquo;\u0026rdquo;, as follows:\nmodule load jaspy/3.7 And if you just want the most up-to-date Python you can even omit the \u0026lt;python_version\u0026gt;, as follows:\nmodule load jaspy \u0026nbsp; If you choose to omit the \u0026lt;release\u0026gt; and \u0026lt;python_version\u0026gt; components then it is important to be aware that the resulting environment may differ over time. For continuity, you ay wish to use the full environment specification. How Jaspy works: managing Python and non-Python packages using conda \u0026nbsp; Jaspy is a framework for managing multiple Python (and other) environments simultaneously on a single platform. It was created in order to meet the requirements tabulated below.\nRequirement Details Jaspy solution Further info Reproducibility 1. Generate a specific set of packages and versions from a generic set of requirements. 1. Conda has a powerful package-management workflow:\na. Begin with a minimal set of package/version requirements.\nb. Generate a consistent environment.\nc. Provide a detailed description of all exact packages/versions in the environment. Conda: https://docs.conda.io jaspy-manager: https://github.com/cedadev/jaspy-manager/blob/master/README.md CEDA jaspy environments: https://github.com/cedadev/ceda-jaspy-envs Documentation Provide an appropriate level of documentation detailing which software packages exist in each release. We use Conda \u0026ldquo;environment files\u0026rdquo; to build the environments. These list the packages and versions and are stored in public GitHub repositories, so each environment is documented as a collection of packages/versions. See: https://github.com/cedadev/jaspy-manager/blob/master/README.md Example package list: https://github.com/cedadev/ceda-jaspy-envs/blob/master/environments/py3.7/m3-4.5.11/jaspy3.7-m3-4.5.11-r20181219/packages.txt Multiple simultaneous environments Allow multiple, but separate, software environments to co-exist on a single operating system. Conda is designed to allow multiple environments to co-exist. Within jaspy it is possible to document each environment. Therefore, multiple environments can be deployed on one system. Key advantages are:\n- Supporting multiple versions of Python and side-by-side.\n- Releasing an update to an environment as a \u0026ldquo;pre-release\u0026rdquo; so that users can adapt their code and test it whilst still having access to the \u0026ldquo;current\u0026rdquo; (production) environment. Manageability Provide tools to easily construct, test, deploy, document and reproduce software environments. Jaspy builds upon a set of excellent Conda command-line tools that simplify the package management process. Jaspy wraps the Conda functionality so that command-line tools can be used to build, test, deploy and distribute Conda environments for use by our community. Updates and tracking of Jaspy/Jasr environments \u0026nbsp; History of environments on JASMIN \u0026nbsp; Please see the Jaspy Python 3.7+ (and other tools) environments section above for information about releases on JASMIN.\nWhich environment is \u0026ldquo;current\u0026rdquo;? \u0026nbsp; Please refer to the Jaspy Python 3.7+ (and other tools) environments section above for information about the current release on JASMIN.\nCiting Jaspy environments \u0026nbsp; Can I cite a jaspy (conda) environment? \u0026nbsp; We do not yet have an agreed approach for citing a Jaspy environment. However, you can refer to the environment description URLs given in the table above. These provide a definitive list of the software packages, their versions and other information.\nRequesting updates to a Jaspy environment \u0026nbsp; If you would like us to add a new package, or an updated version, to the Jaspy environments on JASMIN then please use one of the following approaches:\nContact the JASMIN helpdesk with the subject: \u0026ldquo;Request for Jaspy update: \u0026rdquo; Get a GitHub account and add an issue to the ceda-jaspy-envs repository at: 1. https://github.com/cedadev/ceda-jaspy-envs/issues/new Conda method of \u0026ldquo;activating\u0026rdquo; Jaspy environments \u0026nbsp; Jaspy environments can also be activated in a more traditional way using standard the standard conda approach, for example:\nexport PATH=/apps/jasmin/jaspy/miniconda_envs/jaspy3.7/m3-4.6.14//bin/conda:$PATH source activate conda activate jaspy3.7-m3-4.6.14-r20210320 This has the same result as the module load approach. The naming of the environment identifiers includes the \u0026ldquo;Miniconda\u0026rdquo; version used to generate the environment. The module load approach is recommended as the standard method for activating Jaspy environments.\nUsing Jaspy beyond JASMIN \u0026nbsp; Jaspy is a versatile and generic tool for managing multiple conda environments. The code is open source, and more information is available at:\nhttps://github.com/cedadev/jaspy-manager"
      })
      .add(
      
      
      {
        id: 68,
        tag: "en",
        href: "/docs/short-term-project-storage/jdma/",
        title: "Joint-storage Data Migration App (JDMA)",
        description: "Joint-storage Data Migration App (JDMA)",
        
        
        content: "\u0026nbsp; A new system called NLDS is in development and will eventually replace both Elastic Tape and JDMA. See the JDMA user documentation at:cedadev.github.io/jdma_client for more information about using JDMA.\nThe joint-storage data migration app (JDMA) is a multi-tiered storage system which provides a single API to users to allow the movement of data to a number of different storage systems, query the data they have stored on those storage systems and retrieve the data.\nThese interactions are carried out using a common user interface, which is a command line tool to be used interactively, a python library or a HTTP API, both to be used programmatically. The command line tool essentially provides a wrapper for calls to the python library, which in turn makes calls to the HTTP API.\nJDMA was designed with the following usability criteria in mind:\nThe user experience for moving data, regardless of the underlying storage systems, should be identical. The user should not be responsible for maintaining the connection to the storage system in the case of asynchronous transfers. User and group ownership and permissions should be preserved and restored on downloading the data The user should receive notifications when the transfers are complete. Users should be able to transfer data from one storage system to another JDMA is only a request and query layer. Any cataloguing of data should be carried out by the backend system. So that, if JDMA fails, then the data is still available independently of JDMA, from the storage backend. See the JDMA user documentation at:cedadev.github.io/jdma_client/ for more information about using JDMA.\nJDMA was development under a Horizon 2020 grant from the EU Commission. A report submitted to the EU Commission can be found in the repository at: [github.com/cedadev/django-jdma_control/blob/master/doc/ESiWACE- Milestone-8_final.pdf](https://github.com/cedadev/django- jdma_control/blob/master/doc/ESiWACE-Milestone-8_final.pdf)\nThe JDMA client github is at: github.com/cedadev/jdma_client\nQuick guide to installing the JDMA client on JASMIN \u0026nbsp; If you are working on JASMIN and you wish to use the JDMA client, then you can install it as follows on a sci server:\nmodule load jaspy python -m venv ~/venvs/jdma-venv source ~/venvs/jdma-venv/bin/activate pip install git+https://github.com/cedadev/jdma_client You should then have the jdma command-line tool available in your terminal session.\n\u0026nbsp; In August 2024 the JDMA server was upgraded to a new operating system. This requires an upgraded JDMA client to be installed. If you were using JDMA prior to August 2024 then you will have to upgrade your client. This is a straightforward process of three steps, shown below:\nActivate the virtual environment as above: Install the upgraded JDMA client: Check the version of the JDMA client: The correct version is 1.0.1\nsource ~/jdma_venv/bin/activate pip install --upgrade git+https://github.com/cedadev/jdma_client pip list | grep jdma-client"
      })
      .add(
      
      
      {
        id: 69,
        tag: "en",
        href: "/docs/interactive-computing/login-problems/",
        title: "Login problems",
        description: "Login problems?",
        
        
        content: "Having problems connecting to a host on JASMIN? Details of how to login to JASMIN can be found here, but this article may help to resolve login problems. It provides information for the following issues:\nUnable to login to a login server e.g. login1.jasmin.ac.uk Can login to login server but can\u0026rsquo;t login to a subsequent server ssh-add command gives error: \u0026ldquo;Could not open a connection to your authentication agent.\u0026rdquo; Errors when trying to connect with MobaXterm Unable to login to login server \u0026nbsp; If you are unable to login to a login server e.g. login1.jasmin.ac.uk then look carefully at any error messages displayed as this can help diagnose what is wrong:\n1) \u0026ldquo;Connection reset by peer\u0026rdquo;\nThis suggests a problem with the configuration of your machine or local network. Connections to JASMIN login servers are allowed from a specific set list of network domains (the domain is the part after the host name e.g. myhost. mylocalnetwork.ac.uk ). For this to happen, 2 things need to be in place:\nthe IP address of your machine needs to resolve to a full-qualified host name (so that it can be checked against the list) the domain part of the hostname needs to be on JASMIN\u0026rsquo;s allow list. Use the tool provided on the JASMIN accounts portal to check that your IP address does indeed resolve:\nVisit https://accounts.jasmin.ac.uk/services/reverse_dns_check/ with your browser, or do the following at the command line, on the machine from which you\u0026rsquo;re trying to connect:\ncurl https://accounts.jasmin.ac.uk/services/reverse_dns_check Depending on your system, this will either provide output to the terminal (via stdout) or on some systems this might save the output in the file \u0026ldquo;reverse_dns_check\u0026rdquo;. You may need to look in that file for the result.\nSee check network details for further information on how to interpret the result from this.\nMost institutional networks for UK universities and partner organisations are on our allow list, which is updated on request. However if you are trying to connect from your home broadband, then please be aware that this is not the the preferred route, for security reasons. If you connect from home, please be aware that:\nThe IP address which you are allocated by your internet service provider (ISP) may not resolve to a full hostname That domain name is unlikely to be on the allow list. One solution is to connect via your VPN to your institution first. This assigns you another IP address belonging to that institution, but you need to repeat the checks above to make sure that address resolves (not all do).\nAnother option, if you have SSH terminal access to a machine at your institution from where you can also make outgoing SSH connections, is that you connect from your local machine to the machine at your institution, then make the outward SSH connection to JASMIN from there. In this case, you need to have your JASMIN SSH key loaded on your local machine first, and remember to include the -A flag for \u0026ldquo;agent forwarding\u0026rdquo; for ALL the intermediate steps.\nIf all else fails, you can use the \u0026ldquo;contingency route\u0026rdquo; provide by login2.jasmin.ac.uk (see article for further details), but you will be limited in what you can do / connect to within JASMIN as a result. We prefer all users to connect from their institutional network.\n2) \u0026ldquo;Permission denied\u0026rdquo;\nHere, the most likely cause is that the SSH key which your client is presenting does not match the one in your JASMIN account. This can be for a number of reasons:\nYou have omitted to specify the username in your SSH connection In this case, you will be attempting to connect with the username you have on your local machine, which may not be the same. You have only recently uploaded your SSH key (it can take 20 to 60 minutes before the key propagates to all the places it needs to on JASMIN). Try waiting a few minutes before trying again. You don\u0026rsquo;t have your key loaded in your local authentication agent (e.g. ssh-agent). Check that you are following the method suitable for your operating system\nThe article \u0026ldquo;How to login\u0026rdquo; has instructions for linux, mac and windows. Note that connections using NoMachine NX don\u0026rsquo;t require an authentication agent: this can be a good alternative if you\u0026rsquo;re having problems.\nYou have not yet been granted jasmin-login access or your access has expired. To check, go to List my services on the JASMIN accounts portal and check that \u0026ldquo;Login services: jasmin-login\u0026rdquo; is listed. If not then you either need to apply for jasmin-login access, or if you have already done this recently you may simply need to wait for it to be approved. Note that if you have applied for access to a group workspace you still need jasmin-login access in order to connect to jasmin machines. 3) \u0026ldquo;The authenticity of host \u0026rsquo;nnnn ( )\u0026rsquo; can\u0026rsquo;t be established.\u0026rdquo; or \u0026ldquo;key for host nnnn has changed\u0026rdquo;\nYour local computer stores a list of all the other SSH hosts which it has successfully connected to in the past. If you use an intermediate host like a login server to make onward connections to a sci machine, the login host will maintain another such list. In both cases there should be a file~/.ssh/known_hosts (so one in your local home directory on your own machine, and one in your JASMIIN home directory)\nWhen the SSH client first contacts the host for the SSH connection, it checks to see if the remote host is one that it recognises. If this check fails, you may get a message like the following:\nMessage 1:\nThe authenticity of host \u0026#39;nnnn (\u0026lt;ip address\u0026gt;)\u0026#39; can\u0026#39;t be established. ECDSA key fingerprint is SHA256:8QY9iBcOQFyEYkpOtBUU8WQGeADb0DyMff01BRuvYls. ECDSA key fingerprint is MD5:f9:19:c4:5f:2b:fa:ed:aa:34:86:c9:23:dd:1c:44:30. Are you sure you want to continue connecting (yes/no)? Message 2:\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @ WARNING: POSSIBLE DNS SPOOFING DETECTED! @ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ The ECDSA host key for nnnn has changed, and the key for the corresponding IP address \u0026lt;IP address\u0026gt; has a different value. This could either mean that DNS SPOOFING is happening or the IP address for the host and its host key have changed at the same time. Offending key for IP in /home/users/username/.ssh/known_hosts:62 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY! Someone could be eavesdropping on you right now (man-in-the-middle attack)! It is also possible that a host key has just been changed. The fingerprint for the ECDSA key sent by the remote host is SHA256:Evr7U40sEGSLVypfafLYtbF2oYvGDuBxTyrALdx11pk. Please contact your system administrator. Add correct host key in /home/users/username/.ssh/known_hosts to get rid of this message. Offending ECDSA key in /home/users/username/.ssh/known_hosts:115 ECDSA host key for nnnn has changed and you have requested strict checking. Host key verification failed. This can happen when:\nmachines are re-installed (as part of maintenance by the JASMIN team) when you modify your ~/.ssh/known_hosts file when you access a \u0026ldquo;known\u0026rdquo; host but via a different name (e.g. sci1 vs sci1.jasmin.ac.uk) Message 1 means that you don\u0026rsquo;t have an entry for that host in your ~/.ssh/known_hosts file. In most cases, you can safely reply \u0026ldquo;yes\u0026rdquo; and the SSH connection should proceed as normal from then on.\nIf you get message 2, and are confident that the change is for a legitimate reason, the solution is to modify your ~/.ssh/known_hosts file, removing the entries for that host (there may be more than one, as above for sci1 vs sci1.jasmin.ac.uk) by deleting those lines. Next time you try and connect, you will get message 1, but can reply \u0026ldquo;yes\u0026rdquo; and the SSH connection should proceed as normal.\nNote: If you\u0026rsquo;re using a graphical SFTP or SCP client for data transfers, the error messages above may be hidden and so it can be harder to establish the reason for failure. Using a terminal session (in MobaXterm on Windows, or Mac/Linux terminal) to the problem host will likely reveal the messages and enable you to follow the steps above to solve the problem.\nCan login to login server but can\u0026rsquo;t login to a subsequent host \u0026nbsp; Here, there are 3 main possibilities:\n1) You have not set up agent forwarding correctly on your local machine.\n****This allows your ssh key to be used for logging in from login1.jasmin.ac.uk to other machines. To check, run the following command on the login server:\necho \u0026#34;$SSH_AUTH_SOCK\u0026#34; This should display something that looks similar to (but not identical to)\n/tmp/ssh-RNjiHr2844/agent.2844 If nothing is displayed then it indicates that agent forwarding is not working. Please read how to login and make sure you are running ssh-agent (or similar), have loaded your private key and are using the -A option on your ssh command for the connection to the login server. NX users should make sure that the \u0026ldquo;agent forwarding\u0026rdquo; option is ticked when setting up a connection profile.\n2) Some hosts within JASMIN are restricted to particular (groups of) users.\nThe \u0026ldquo;sci\u0026rdquo; servers (e.g. sci1.jasmin.ac.uk) and \u0026ldquo;xfer\u0026rdquo; machines (e.g. xfer1.jasmin.ac.uk) should be available to all with jasmin-login access (see above). However, some other machines are restricted to particular project participants and require special permission to use. For example, the high- performance transfer servers hpxfer[12].jasmin.ac.uk requires the hpxfer access role, which can be applied for at the JASMIN accounts portal, as can most roles currently in use.\n3) There is a problem with the host you are trying to connect to.\nOccasionally there may be problems with the host (machine) which you are trying to connect to. The sci servers (particularly the high-memory host jasmin-sci3) experience very high usage loads and occasionally run out of resources. This may prevent you from logging in. In some circumstances ask you for a password: this is normally a sign that something is wrong with the machine, since passwords are not used for host logins on JASMIN, so there is no point in trying to enter your account password or SSH passphrase at this point. In this case please contact us using the help beacon below.\nIf you still have problems then please contact us using the help beacon below. It would be helpful if you can include as much of the following information as possible:\nThe IP address and full hostname of the machine you are trying to connect from. The date and time that you tried connecting (to the nearest minute if possible). This will help us to identify any relevant messages in any log files. The exact command you were using Add \u0026ldquo;-vvv\u0026rdquo; to your SSH command and send us the the output (please include the SSH command itself) List the SSH keys directory on your local machine. On a linux machine this can be done with the command: ls -l ~/.ssh ssh-add command gives error: \u0026ldquo;Could not open a connection to your authentication agent.\u0026rdquo; \u0026nbsp; On some terminal sessions the usual instructions for starting the ssh-agent session and adding the key may give the following error:\nssh-add ~/.ssh/id_rsa_jasmin Could not open a connection to your authentication agent. If you get this message, please try either:\nmodifying the method you use to start the ssh-agent, to:\neval $(ssh-agent -s) (and then trying to load the key again)\nor see below (if using MobaXterm) which now has a better way of loading the SSH key.\nErrors when connecting with Mobaxterm \u0026nbsp; Please follow the instructions for MobaXterm (which include a video to show how to load your key into its own ssh-agent, MobAgent).\nThese instructions have changed with more recent versions of MobaXterm, and replace the need to use the ssh-add command, so please make sure that both the version you are using, and your method, are up to date!\nPlease note that even if your initial connection to (for example) your university host does not require your JASMIN SSH key, you should still load the key AND enable agent forwarding, for your initial connection to that host, so that the key can be used for the subsequent connection to the JASMIN login host. This actually applies to any connection method, not just MobaXterm."
      })
      .add(
      
      
      {
        id: 70,
        tag: "en",
        href: "/docs/interactive-computing/login-servers/",
        title: "Login servers",
        description: "Login servers",
        
        
        content: "Available login servers \u0026nbsp; There are three login servers available to access resources within JASMIN. Users with the jasmin-login access role can access the following servers via SSH:\nLogin server name details login1.jasmin.ac.uk best for use from university networks (requires fwd/reverse DNS lookup to domain in allow-list) login2.jasmin.ac.uk Contingency config, see notes below login3.jasmin.ac.uk as per login1 login4.jasmin.ac.uk as per login1 See also How to login and other articles in the Getting started category.\nSee also NoMachine NX service which provides login to a graphical Linux desktop, rather than a single terminal window.\nFeatures of login servers \u0026nbsp; Login servers have minimal resources and software installed. They provide:\nAccess to your home directory (/home/users/\u0026lt;username\u0026gt;). Access via SSH to other hosts within JASMIN (inside the RAL firewall) No analysis software is installed on the login servers. No access to group workspaces or other volumes. \u0026ldquo;Contingency\u0026rdquo; login servers \u0026nbsp; There are requirements on your local network which apply to accessing the login servers and the transfer servers via SSH. If you cannot meet these requirements, even after discussion with your local network admin team, a contingency route is provided in the form of login server login2.jasmin.ac.uk\nHowever, you will be limited in what you can access within JASMIN from this server. Specifically:\nYou will not be able to access the transfer servers xfer[1,2].jasmin.ac.uk via SSH directly from an external host. You can access these via SSH from login2, but can then only initiate an inward pull of data from an external SSH server, if available at your institution. You cannot push data directly to xfer[1,2].jasmin.ac.uk via SSH from outside in this case. Instead, an alternative transfer server xfer3.jasmin.ac.uk is provided with equivalent configuration to login2. This should provide what you need for direct SSH transfers from outside, but you will need the additional \u0026quot;xfer-sp\u0026quot; access role in in this case: see here for further details. How to use the login servers \u0026nbsp; For full details of how to log in, including making onward connections to other machines, please see the article \u0026ldquo;How to login\u0026rdquo;.\n\u0026nbsp; Users are not permitted to execute commands which require administrative privileges. This applies to all hosts in the managed part of JASMIN where users have SSH login access (for example login, nx-login, sci, xfer and hpxfer machines).\nIn other words, the use of su and sudo is not permitted.\nPlease be careful when typing commands, particularly if you have multiple terminal windows open on your own computer, that you do not accidentally attempt sudoon a JASMIN machine: expect some follow-up from the JASMIN team if you do!"
      })
      .add(
      
      
      {
        id: 71,
        tag: "en",
        href: "/docs/batch-computing/lotus-cluster-specification/",
        title: "LOTUS cluster specification",
        description: "LOTUS cluster specification",
        
        
        content: "Current cluster specification \u0026nbsp; LOTUS is a cluster of over 300 nodes/hosts and 19000 CPU cores. A node/host is an individual computer in the cluster with more than 1 processor. Each node/host belongs to a specific host group. The number of processors (CPUs or cores) per host is listed in Table 1 with the corresponding processor model and the size of the physical memory RAM available per node/host.\nTable 1. LOTUS cluster specification\nCurrent host groups\nHost group name Number of nodes/hosts Processor model CPUs per host RAM broadwell256G 37 Intel Xeon E5-2640-v4 \u0026ldquo;Broadwell\u0026rdquo; 20 256 GB skylake348G 151 Intel Xeon Gold-5118 \u0026ldquo;Skylake\u0026rdquo; 24 348 GB epyctwo1024G 200 AMD 48 1024 GB Selection of specific processor model \u0026nbsp; To select a node/host with a specific processor model and memory, add the following Slurm directive to your job script\n#SBATCH --constraint=\u0026#34;\u0026lt;host-group-name\u0026gt;\u0026#34;For example\n#SBATCH --constraint=\u0026#34;skylake348G\u0026#34; \u0026nbsp; Further notes\nintel and amd node types are defined in the Slurm configuration as a feature:\nFor any Intel node type use #SBATCH --constraint=\u0026quot;intel\u0026quot; For a specific Intel CPU model use the host group name (see Table 1) e.g. #SBATCH --constraint=\u0026quot;skylake348G\u0026quot; For AMD use #SBATCH --constraint=\u0026quot;amd\u0026quot; There are 10 nodes of node type skylake348G with SSD disk mounted on /tmp LOTUS nodes of node type epyctwo1024 are not available yet on the par-multi queue \u0026nbsp; If you choose to compile code for specific architectures, do not expect it to run elsewhere in the system. Retired host groups no longer in use \u0026nbsp; (For reference only)\nHost group name Number of nodes/hosts Processor model CPUs per host RAM haswell256G 7 retired Intel Xeon E5-2650-v3 \u0026ldquo;Haswell\u0026rdquo; 20 256 GB ivybridge2000G 3 -retired Intel Xeon E7-4860-v2 \u0026ldquo;Ivy Bridge\u0026rdquo; 48 2048 GB"
      })
      .add(
      
      
      {
        id: 72,
        tag: "en",
        href: "/docs/batch-computing/lotus-overview/",
        title: "LOTUS overview",
        description: "LOTUS overview",
        
        
        content: "This article gives an overview of the LOTUS batch computing cluster which is part of JASMIN. It covers:\nWhat LOTUS is and what it can be used for Where LOTUS can be accessed from What is LOTUS \u0026nbsp; LOTUS is not, in itself, a High-Performance Computing (HPC) facility, but provides the batch and parallel processing component of the JASMIN data- intensive scientific analysis environment. LOTUS is a cluster of physical machines, running the Slurm workload manager, enabling efficient scheduling of larger data analysis tasks across nodes in the cluster as a single unit -see Figure 1.\nEach node in the cluster is connected by 10Gbit/s Ethernet to JASMIN\u0026rsquo;s high-performance 40Gbit/s core network. Although not its primary function, LOTUS also facilitates MPI-based parallel processing.\nJASMIN provides both interactive and batch computing environments, recognising that scientists often need to develop and test workflows interactively before running those workflows efficiently at scale. Nodes within LOTUS run the same stack of software and can access the same high- performance storage as the JASMIN Scientific Analysis servers, ensuring a consistent working environment for all phases of users\u0026rsquo; workflows.\nSee LOTUS Hardware for details of the current LOTUS environment summarised in this schematic presentation\nFigure 1 shows a schematic presentation of the LOTUS cluster and its environment\nLOTUS schematic When to use LOTUS \u0026nbsp; LOTUS is ideally suited to workflows which need to process or compare entire datasets, stored either in Group Workspaces or in the CEDA archives. The latter are directly accessible read-only so can be processed in-place without the need to copy files. Intermediate working files (within batch jobs) should be stored temporarily in /work/scratch-pw* and /work/scratch-nopw* volumes which are shared across the cluster, while persistent outputs can be written efficiently to Group Workspaces and shared with collaborators for the duration of a project.\nSee Access to Storage for details about which file systems are appropriate to use and how to access them.\nLOTUS currently has around 19,000 cores, but is heavily used and implements a fair-share scheduling system between users. It is not intended as a substitute for dedicated HPC facilities, rather as a complementary environment in which model outputs can be analyzed and compared with observational data. Users with large-scale compute-heavy requirements (in particular those requiring large- scale parallel processing) should look to access other parts of the national HPC infrastructure such as ARCHER2 or MONSooN.\nIn order to maintain a safe and reliable working environment for all within LOTUS and more widely within JASMIN, users are expected to follow the best practice outlined in this documentation.\nHow to gain access to LOTUS \u0026nbsp; LOTUS is accessible via the batch scheduler system Slurm that is running across all JASMIN scientific analysis servers sci[1-8].jasmin.ac.uk.\nFrom the above servers, it is possible to submit, monitor, and control batch jobs using the Slurm commands.\nPlease note that if you have only recently requested access to JASMIN login services and had this approved, there can sometimes be a delay (typically up to a day, but in rare cases can be longer) before the necessary configuration is created for you on LOTUS. You will not be able to submit jobs to LOTUS queues until this has been completed. Typically you would see an error message such as this, in this case after an unsuccessful attempt to submit to the short-serial queue:\nsbatch: error: Batch job submission failed: Invalid account or account/partition combination specifiedIf this occurs, please try again in 24 hours before contacting the JASMIN helpdesk."
      })
      .add(
      
      
      {
        id: 73,
        tag: "en",
        href: "/docs/short-term-project-storage/managing-a-gws/",
        title: "Managing a GWS",
        description: "Managing a GWS",
        
        
        content: "This article explains the responsibilities of the Group Workspace (GWS) manager.\nRole of the GWS Manager \u0026nbsp; When a GWS is created it is important that the designated GWS Manager understands the responsibilities associated with the role. The GWS Manager has a duty to:\nEnsure that GWS is being used appropriately: this may include enforcement of limits on particular users. Advertise the URL for requesting access to the GWS. Respond to e-mail authorisation requests from CEDA. Manage disk and tape effectively: specifically the use of the Elastic Tape system to back-up or migrate data. Communicate GWS etiquette to the project scientists. Manage additional services such as sharing of GWS data via HTTP server. Manage the closing down of the GWS effectively: all GWSs have a termination date and data may be lost if not managed effectively. Communicate any issues to the CEDA Helpdesk. Managing users \u0026nbsp; Authorising access to the GWS \u0026nbsp; When your GWS has been set up, users can submit requests for access to the GWS via the JASMIN accounts portal: the new GWS will appear in the list of JASMIN Services. An access request from a user will trigger an e-mail to you that asks you to approve (or refuse) the request. The e-mail will include details of the user and their intended use of the resource. As GWS manager, you are now responsible for approving these requests (this is a change from the previous situation where you confirmed your approval to the CEDA helpdesk who then actioned the approval). Now the approval is instant.\nIMPORTANT: in order for this approval process to work, the GWS manager\u0026rsquo;s own account needs to have been migrated to the JASMIN accounts portal if it existed prior to the JASMIN Accounts Portal in 2017. Very few accounts such now remain in that state, but you can check by going to this page:\nMigrate your account\u0026nbsp; \u0026nbsp; \u0026nbsp; If it says \u0026ldquo;You are already logged in with a JASMIN account\u0026rdquo; then you need take no further action.\nFile system permissions and groups \u0026nbsp; File system access to a GWS is managed using a Unix group that begins with gws_ and normally corresponds with the name of the service in the Accounts Portal. When users are granted the USER role for the workspace, they are also made members of the corresponding gws_\u0026lt;gwsname\u0026gt; group. As manager, you are normally granted USER and MANAGER access at the time that the GWS is set up by the JASMIN team, so it should be in place when you first access the storage. This means that:\nyou have access yourself to the workspace (via the USER role giving you membership of the gws_\u0026lt;gwsname\u0026gt; group) you take over responsibility (via the MANAGER role) for approving other users\u0026rsquo; applications for the USER role. you can unilaterally grant DEPUTY access to other users if you know their username and want them to help you in the task of approving requests for USER access. Once you yourself have access, a good first task is to set up the recommended directory structure.\nA list of the user IDs that have access to a given GWS can be found by using the \u0026ldquo;getent group\u0026rdquo; command and piping it through \u0026ldquo;grep\u0026rdquo; to select only your GWS. For example:\ngetent group | grep gws_cedaproc gws_cedaproc:*:26015:fbloggs,jdoe You can lookup a specific user ID with the following:\ngetent passwd | grep fbloggs fbloggs:*:29775:26030:Fred Bloggs:/home/users/fbloggs:/bin/bash Maintaining group permissions throughout the GWS \u0026nbsp; In order to maintain the group permissions throughout the GWS the highest level directory has the \u0026ldquo;sticky bit\u0026rdquo; set. This means that the default group for all files and directories created within the GWS will be the relevant gws_* access group. This is particularly useful to enable data within the GWS to be shared amongst collaborators. If users have a specific need to modify the group permissions they can do so using \u0026ldquo;chgrp\u0026rdquo; command.\nMaking directory contents writable by other members of the GWS \u0026nbsp; If a user wishes to make their files/directories writable by others in the GWS they can follow the procedure here using the \u0026ldquo;umask\u0026rdquo; command:\nMake a directory (and set it the permission so that the group can read/write to it):\nmkdir --mode=u+rwx,g+rws,o-rwx testdir ls -l testdir drwxrws--- 2 jdoe gws_cedaproc 4096 Jan 26 14:36 testdir Or (as separate steps):\nmkdir testdir chgrp g+rws testdir chgrp o-rwx testdir ls -l testdir drwxrws--- 2 jdoe gws_cedaproc 4096 Jan 26 14:36 testdir However, please also see security, below (and make sure your users are aware of this).\nCheck your umask:\numask 0022 Modify your \u0026ldquo;umask\u0026rdquo; so that any new file or directory that you create will be writable anyone with the group permission:\numask 002 touch testdir/newfile ls -l testdir -rw-rw-r-- 1 jdoe gws_cedaproc 0 Jan 26 14:39 newfile If you want the umask setting to persist, you should set it for yourself in your ~/.bashrc file, and advise your users to do the same.\nQuota, resource allocation and GWS lifetime \u0026nbsp; The overall usage of a GWS can be determined with the df (SOF) or pan_df (PFS) command:\npan_df -H /gws/pw/j07/workshop/ Filesystem Size Used Avail Use% Mounted on panfs://panmanager03.jc.rl.ac.uk/gws/pw/j07 2.6T 16G 2.6T 1% /gws/pw/j07/workshop/ df -H /gws/nopw/j04/ncas_generic Filesystem Size Used Avail Use% Mounted on quobyte@sds.jc.rl.ac.uk/gws_ncas_generic 83T 80T 3.4T 96% /gws/nopw/j04/ncas_generic For PFS (paths beginning /gws/pw/j07/*), the raw capacity of the GWS is 2.6TB (measured in TB, defined using powers of 10), but to obtain space available to users this should be divided by roughly 1.3, resulting in around 2TB of free space. Of this, 16GB is currently in use. The factor of 1.3 can depend on the number of small files stored in the GWS because lots of small files take up more space than expected.\nFor SOF (paths beginning /gws/nopw/j04/*), the value reported by df -H is the usable size.\nA summary of specific sections of a GWS can be determined using pan_du -sh \\\u0026lt;di\\r\u0026gt; (PFS), and du -sh --si --apparent-size \\\u0026lt;dir\\\u0026gt; (SOF). Set the --apparent-size flag to get an accurate size.\nSimilarly, you can use the find command together with -atime or -mtime to locate files accessed or modified more than a certain length of time ago. For example, to find files which were accessed more than 1 year ago:\nfind /gws/nopw/j04/upscale/cache -type f -atime +365However, this can\nconsume significant system resources in running the du command, for a long time, and fail due to permission issues (as a regular user, you can\u0026rsquo;t always \u0026ldquo;see\u0026rdquo; down all the directory branches) \u0026hellip;So we provide some tools to help with this:\nThe GWS Scanner runs this for you, centrally, on a roughly 2-week cycle, and stores all the output in a database from which results can be visualised in the GWS Scanner User Interface.\nThere is also a live view of GWSs and the available space left on the JASMIN Dashboard. The “JASMIN Storage” tab shows many JASMIN storage volumes with information about current usage.\nSo please don\u0026rsquo;t run large du or find jobs yourself, as this will be duplicating something already running in the background.\nAs a GWS Manager you will receive e-mails summarising the usage and contents of the GWS. If you wish for additional directories to be scanned and summarised please add these to the GWS scanner configuration.\nThe typical lifetime of a GWS is 3 years. All GWS managers are expected to actively manage the space during its lifetime and plan for the eventual reclamation of the space by deleting and migrating data to other locations. Typically, less-frequently-used data might be written to Elastic Tape (see below) and some final outputs would be curated in the CEDA Archive. In the latter case please note that you should discuss the requirements with the CEDA Archive team via the CEDA Helpdesk, ideally before the project starts.\nMigrating data to tape \u0026nbsp; Proactive data management is an important part of providing an effective GWS. We recommend that the GWS Manager discusses use of the space with the project team to ensure that the use of disk and tape are being optimised. This may involve use of the Elastic Tape system for backup or data migration (from disk to tape).\nRequesting a change to the GWS size \u0026nbsp; Although it is helpful to provide the best estimate of required allocation at the time of initially requesting the GWS, a GWS Manager may request a change in size (increase or decrease) of the GWS during its lifetime. We would positively encourage you to be honest about your requirements so that others can make use of this expensive resource if you are not using it until later in your project, or if you no longer require all the space you originally requested.\nRequests for an increase in GWS size will be considered by the Consortium Manager with responsibility for managing an overall allocation to that particular scientific community. See Requesting Resources. Depending on available resources and competing demand, it may not always be possible to increase the allocation, and you may be asked to move data to Elastic Tape to free up disk space.\nSecurity \u0026nbsp; User account security is very important in a multi-user environment such as JASMIN. As a GWS Manager you have a responsibility to users of your GWS but also to all other GWS users in helping to maintain a safe and secure system in which productive scientific work can be done. There is a strict policy of one- user-one-key, and on no account must any user make use of the SSH key of another user to gain access to any part of the JASMIN infrastructure. Private keys MUST be protected by a strong passphrase. Please encourage adherence to these rules by users of your GWS. Any infringements may be dealt with swiftly by removal of user access. No offensive, obscene or otherwise unauthorised data may be stored in the GWS or anywhere else within JASMIN. Users should not store any data of a personal or sensitive nature in the GWS.\n\u0026nbsp; Do not set, or allow your users to set, open permissions on files or directories. By this we mean permissions where data are \u0026ldquo;world-writable\u0026rdquo; by anyone, for example\n-rw-rw-rw- for a file, or \u0026laquo; DON\u0026rsquo;T USE THESE!!\ndrwxrwxrwx for a directory. \u0026laquo; OR THESE!!\nWe provide a UNIX a group corresponding to each group workspace, which all members of that GWS belong to: this enables sharing within the group if you set permissions appropriately using that group. If you are unsure about setting permissions, please ask the helpdesk.\nKeeping informed \u0026nbsp; Please maintain contact throughout the life of the GWS via the following channels:\nUsing the JASMIN dashboard to check on the status of your GWS (used versus available space). Email alerts from the system when the GWS reaches \u0026gt;83% full Email from the CEDA/JASMIN team News articles on the CEDA or JASMIN websites and by monitoring CEDA social media feeds which may be used to post messages regarding system status or security. CEDA Website CEDA News on Twitter If you are aware that a user who has access to your GWS leaves your project or, for whatever reason, no longer needs to be a member of the GWS, please let the JASMIN Helpdesk know either by email or via the beacon, lower right on this page. Arrangements may need to be made to transfer the ownership of files and/or directories to another member of the GWS to ensure continued access to the data."
      })
      .add(
      
      
      {
        id: 74,
        tag: "en",
        href: "/docs/software-on-jasmin/name-dispersion-model/",
        title: "Met Office NAME Model",
        description: "Met Office NAME Model",
        
        
        content: "This article provides links to information about running the Met Office atmospheric dispersion model, NAME, on JASMIN.\nThe NAME atmospheric dispersion model \u0026nbsp; The Met Office\u0026rsquo;s Numerical Atmospheric-dispersion Modelling Environment (NAME) https://www.metoffice.gov.uk/research/modelling-systems/dispersion-model can be run on JASMIN using the LOTUS cluster. A NAME Group Workspace is provided to store both the Numerical Weather Prediction (NWP) met data needed to drive NAME as well as the user outputs derived from NAME itself.\nThis service has been developed through a collaboration between STFC CEDA, the Met Office Atmospheric Dispersion and Air Quality team and the University of Leicester.\nIf you would like to know more about running NAME on JASMIN, please contact us at atmospheric.dispersion@metoffice.gov.uk."
      })
      .add(
      
      
      {
        id: 75,
        tag: "en",
        href: "/docs/getting-started/migrate-jasmin-account-from-ceda/",
        title: "Migrate a JASMIN account from CEDA",
        description: "Migrate a JASMIN account from CEDA",
        
        
        content: "\u0026nbsp; JASMIN accounts created before February 2017 had to be migrated to use the JASMIN accounts portal. It is now no longer possible to do this migration automatically.\nIf you had a JAMIN account which you haven\u0026rsquo;t used since before February 2017, we might be able to help you reclaim it. Please contact support@jasmin.ac.uk and if your account still exists we will advise as to if you are able to reclaim it."
      })
      .add(
      
      
      {
        id: 76,
        tag: "en",
        href: "/docs/software-on-jasmin/rocky9-migration-2024/",
        title: "Migration to Rocky Linux 9 2024",
        description: "Software and operating system changes - migration to Rocky Linux 9 (Summer 2024)",
        
        
        content: "\u0026nbsp; Watch this space for further updates about the details and timetable for the migration to Rocky Linux 9 on JASMIN. Introduction \u0026nbsp; As with a previous migration completed in 2020, the change of operating system version is needed to make sure that the version in use is current and fully supported, i.e. that package updates are available and important security updates can be obtained and applied to keep the platform secure.\nThe current operating system, CentOS7 is officially end-of-life as of the end of June 2024. We will be moving from CentOS7 to Rocky Linux 9, which is supported until May 2032. Rocky9 should provide a very similar user experience to that provided by CentOS7, but with more recent software packages. Some software may have been removed or replaced during this transition.\nThis change affects JASMIN and CEDA services in several ways, including but not limited to the following:\nComponents of all CEDA Archive and JASMIN web-based services need to be redeployed User-facing service hosts (e.g. login/sci/xfer and LOTUS nodes) all need to be redeployed All of these hosts need appropriate versions of drivers for various hardware and infrastructure components (e.g. storage, network, …) to be configured. The Slurm scheduler used for the LOTUS and ORCHID clusters needs to be adapted to work under Rocky 9, in terms of its own management functions and the worker nodes which it controls. A separate announcement will cover the expansion of LOTUS with new processing nodes: these will be introduced as a new cluster under Slurm, with existing nodes moved from old to new as part of the transition. There will be a limited window in which the 2 clusters will co-exist, during which time the old cluster will shrink in size: the current estimate for this is between July to September 2024, but we will provide updates on this as the new hardware is installed and timescales become clearer. We will endeavour to provide sufficient overlap and temporary arrangements to help users to migrate their workflows. Software made available centrally via the module system and under /apps needs to be made available in versions compatible with Rocky 9. Some software may need to be recompiled. Other software (e.g. run by users or groups, without being centrally managed) may need to be tested and in some cases recompiled in order to work correctly under Rocky 9. Management and monitoring systems need to be updated to operate in the new environment For tenants of the JASMIN Cloud, you should already be aware of our plans to move to use the STFC Cloud as the base platform for the JASMIN Cloud Service. Images are currently in preparation so that new (empty) tenancies will soon be available for tenants to manage the migration of their own virtual machines over to new instances using Rocky 9 images. It is anticipated at this stage that managed tenancies (with tenancy sci machines) will be discontinued as part of this move, so users of those VMs will be advised to use the new Rocky 9 general-use sci servers instead. Much of this work is already underway by teams in CEDA and STFC’s Scientific Computing Department. As a result of extensive work by these teams in recent years to improve the way services are deployed and managed, we are now in a much better position to undertake this kind of migration with as little disruption to users as possible. Some disruption and adaptation by users will be inevitable, however.\nSome services have already been migrated and are already running under Rocky 9, but there is still much work to be done over the coming weeks so please watch this space as we do our best to keep you informed of the progress we’re making, and of any actions you may need to take to minimise disruption to your work on JASMIN.\n\u0026nbsp; Further details to follow soon."
      })
      .add(
      
      
      {
        id: 77,
        tag: "en",
        href: "/docs/uncategorized/mobaxterm/",
        title: "MobaXterm (Windows terminal client)",
        description: "Using MobaXterm with JASMIN",
        
        
        content: "Windows users are strongly recommended to connect to JASMIN using the freely available program MobaXterm.\nVersions of MobaXterm \u0026nbsp; The instructions given below are for version 24 of MobaXterm. For other versions please check the MobaXterm documentation.\nThe method of configuring MobaXterm to store your private key has changed with different versions. The recommended method, and an alternative, are shown below.\nDownloading and installing MobaXterm \u0026nbsp; Visit the MobaXterm website to download the free Home edition.\nThere are 2 editions available:\n\u0026ldquo;Portable\u0026rdquo; edition (can be installed as a regular user) \u0026ldquo;Installer\u0026rdquo; edition (may need admin privileges on your machine) Both editions should be functionally the same once installed, but your choice may depend on what level of access you have to your Windows machine.\nFor the \u0026ldquo;portable\u0026rdquo; edition, the contents of the downloaded zip file should be extracted to a folder (eg. on your Windows desktop) where you can double-click the executable file MobaXterm_Personal_xx.x (where xx.x is the version number). Note that the CygUtils.plugin file should remain in this folder as this is used for storing settings.\nOnce opened, MobaXterm presents a screen like this:\nMobaXterm's initial screen You can use the Start local terminal button or click the + tab to open multiple tabs with a different terminal session in each tab. However, it\u0026rsquo;s worth setting up MobaXterm so that your private key is held globally and is available to any new terminal session that you open.\nEnabling MobAgent to store your private key \u0026nbsp; In order to log in to a remote host (e.g. a JASMIN host) you need to present your private key which is kept your local machine. MobaXterm provides MobAgent which can store your key for the time you are running MobaXterm, and can then present it for you, for any session in any tab, so you don\u0026rsquo;t have to enter your passphrase for each new tab that you open.\nVideo demonstration \u0026nbsp; The video below demonstrates this process, or you can follow the screenshots which follow:\nSteps with screenshots \u0026nbsp; You need to enable MobAgent in Settings \u0026gt; Configuration \u0026gt; SSH:\nSSH Configuration tab To do this:\nTick Use internal SSH agent \u0026quot;MobAgent\u0026quot; Un-tick Use external Pageant Click the + symbol to locate your private key file (e.g. id_rsa_jasmin) Click OK to save the settings. MobaXterm will now need to restart. When you restart MobaXterm you will be prompted for the passphrase associated with your private key. Private key passphrase prompt Once MobaXterm has started, you can check that your SSH key has been loaded by clicking on Start local terminal and using ssh-add -l to list the keys currently loaded.\nWhen you type the following command in the MobaXterm terminal, you should see output similar to below:\n\u0026nbsp; IMPORTANT: The box below is an example of what your command line prompt might look like.\nThe username and computer name on the left indicates which machine you are currently on. Everything to the right of the dollar symbol \u0026lsquo;$\u0026rsquo; is the command which you are entering into the terminal.\nYou don\u0026rsquo;t need to type the \u0026lsquo;$\u0026rsquo; or anything before it!\nThe rest of the documentation will use this format to show whether you should run the command on your local machine (user@localhost) or on JASMIN (user@sci1).\nssh-add -l 2048 SHA256:1WgYUGSqffxJX6bWqBZvFsutN3Psjn5mcPV37r6D7vQ Imported-Openssh-Key (RSA) Sometimes the last part of this output shows your email address, but it is just a comment field at the end of the key, which can be ignored. The fact that it\u0026rsquo;s returned something which looks like a key \u0026ldquo;fingerprint\u0026rdquo;, shows that your key is loaded successfully into the agent.\nIf you don\u0026rsquo;t see your key listed in output similar to the above, please try again: perhaps you entered the wrong passphrase? But you will need to succeed in loading your key before you can connect to JASMIN.\nLogging in to JASMIN using key stored in MobAgent (recommended) \u0026nbsp; As shown in the video above, once you have set up MobAgent you can connect to JASMIN by creating a new terminal window. Click the Start local terminal button.\nNext, try connecting to the login server:\nssh -A \u0026lt;user_id\u0026gt;@login2.jasmin.ac.uk (replace \u0026lt;user_id\u0026gt; with your own JASMIN username)\nLogging in to JASMIN without storing your key in MobAgent \u0026nbsp; MobAgent provides the most convenient way of accessing JASMIN. However, if you want to login to JASMIN without setting up MobAgent you can do so as follows.\nClick on the Start local terminal button then enter the following command. The final two lines show the output you should see: you are prompted for your key\u0026rsquo;s passphrase, then if successful, you see confirmation that the key is loaded.\neval $(ssh-agent -s) ssh-add ~/.ssh/id_rsa_jasmin Enter passphrase for ~/.ssh/id_rsa_jasmin: Identity added: ~/.ssh/id_rsa_jasmin If your key is named something different, or stored at a different location than shown above, you will need to specify its location in the ssh-add command. Note that MobaXterm refers to Windows drives as e.g. /drives/c/ (with forward slashes). So if you\u0026rsquo;ve put your key on your desktop, then the path to that might be /drives/c/Users/fred/Desktop/id_rsa_jasmin (if \u0026ldquo;fred\u0026rdquo; is your local username on Windows).\nYou will need to do this each time you open a new terminal session. To connect to JASMIN:\nssh -A \u0026lt;user_id\u0026gt;@login2.jasmin.ac.uk Again, you must replace \u0026lt;user_id\u0026gt; with your JASMIN username.\nAs you can see, the MobAgent method mentioned previously makes this a bit easier, because it persists between sessions and you navigate to the location of your private key using graphical tools instead of having to type the path.\nAdditional MobaXterm features \u0026nbsp; MobaXterm is a comprehensive application that enables many useful features such as:\nSaved session configurations X-forwarding / X11 / X server (Not recommended on JASMIN, see NoMachine NX for graphical linux desktop instead) SSH agent forwarding SFTP access (with graphical drag-n-drop) Split-tab mode SSH tunnelling Basic Linux commands such as: cd, ls, pwd, cat Command-line transfer utilities: scp, rsync, wget Please see the MobaXterm documentation for details on these."
      })
      .add(
      
      
      {
        id: 78,
        tag: "en",
        href: "/docs/mass/moose-the-mass-client-user-guide/",
        title: "MOOSE (the MASS client) User Guide",
        description: "MOOSE (the MASS client) User Guide",
        
        
        content: "External Users\u0026rsquo; Version hosted on JASMIN."
      })
      .add(
      
      
      {
        id: 79,
        tag: "en",
        href: "/docs/getting-started/multiple-account-types/",
        title: "Multiple account types",
        description: "Multiple account types",
        
        
        content: "Trial period extended\nThis article defines the types of account available on JASMIN and their purpose. It covers:\nSTANDARD accounts (with note about training accounts) SHARED accounts SERVICE accounts Introduction \u0026nbsp; For some time, we have been asked by user communities to cater for legitimate use cases where accounts need to be shared by a small, known and pre-arranged set of users, or by services or functions.\nTo maintain a secure approach, we have brought these together into a clearly- defined set of account types for each purpose.\nThese are being introduced on a trial basis as of 1st June 2023 for an initial period of 7 months.\nDefinitions \u0026nbsp; STANDARD accounts \u0026nbsp; A standard account:\nis for use by one human individual user only. can login to the JASMIN accounts portal to (re)set a password, store an SSH key and apply for access roles. has a unique SSH key, traceable to its owner. Training accounts are a special type of STANDARD account, issued on a short-term basis and preconfigured with certain access roles as required for training events.\nA standard account holder may act as a responsible user on one more service or shared accounts.\nSHARED accounts \u0026nbsp; A shared account:\nis for use by a small, defined set of responsible users , each associated by their standard account username has a set of SSH public keys, one for each responsible user. The shared account itself does not have a key, and users do not share keys. The set of keys associated with the shared account is updated automatically in the event that any individual responsible user changes their the SSH key on their own standard account. can log in to the JASMIN accounts portal using the shared account username to apply for roles and can (re)set a a password, which may be shared securely** and only between the set of responsible users. The accounts portal profile for the shared account will display, but not allow editing of, the public keys of the responsible users. can be used by individual responsible users to login via SSH, but using their own individual SSH private key which must not be shared with any other user, and should be kept locally, i.e. not uploaded to anywhere on JASMIN. by default, emails originating from the JASMIN accounts portal destined for shared accounts are instead sent to all their responsible users. An optional email address for the shared account itself may be specified in the accounts portal profile for the account. can perform any action in the system that a standard account can, including but not limited to the following (and subject to membership of relevant access roles): becoming a member of a group workspace using elastic tape / JDMA submitting a job to the LOTUS batch processing cluster obtaining an short-lived credential for use with a high-performance transfer method may be requested by a user or group of users via the JASMIN helpdesk, but the decision as to whether to grant the request is at the discretion of the JASMIN team, after scrutiny of the request, its justification and the past JASMIN behaviour of the individual users proposed to be responsible for the shared account. **An example of a secure means of sharing a password is to use Keeper (or similar password manager system) to share a securely-stored entry with a specific list of other individuals in an encrypted form. Password sharing via unencrypted means (such as a text file, email or post-it note) is not permitted.\nSERVICE accounts \u0026nbsp; A service account:\nis for use by a service or function only has one or more responsible users , each associated by their standard account username can never log in to the JASMIN accounts portal or (re)set a password. may be granted roles by arrangement with the JASMIN team has no SSH key emails originating from the JASMIN accounts portal destined for service accounts are instead sent to all their responsible users. An optional email address for the service account itself may be specified in the accounts portal profile for the account. may be requested by a user or group of users via the JASMIN helpdesk, but the decision as to whether to grant the request is at the discretion of the JASMIN team, after scrutiny of the request, its justification and the past JASMIN behaviour of the individual users proposed to be responsible for the service account. NOTES:\nWith the implementation of these new account types, existing setups will be examined and discussed with their \u0026ldquo;owners\u0026rdquo; and moved over to either service or shared account types as appropriate. Users of a shared or service account are jointly responsible for actions performed by the account. This requires coordination and communication between responsible users, which should be done independently of the JASMIN system. Membership of a shared or service account , and availability of the account itself, may be withdrawn if behaviour falls outside the JASMIN Terms and Conditions. In serious cases, individual users may be barred from further use of JASMIN altogether. Users are reminded to familiarise themselves with the Terms and Conditions and have a responsibility to keep up to date with them as they change. Users must also pay attention to service announcements made by the JASMIN team by email and other means. Requests for shared or service accounts should be sent to the JASMIN helpdesk with \u0026ldquo;shared account request\u0026rdquo; or \u0026ldquo;service account request\u0026rdquo; in the subject line."
      })
      .add(
      
      
      {
        id: 80,
        tag: "en",
        href: "/docs/software-on-jasmin/nag-library/",
        title: "NAG Library",
        description: "The Numerical Algorithm Group (NAG) Library",
        
        
        content: "This article introduces the Fortran and C library of software under the Numerical Algorithm Group (NAG) license. NAG Library is a collection of robust, documented, tested and maintained numerical algorithms.\nAccessing the NAG Library \u0026nbsp; Requesting access \u0026nbsp; If you wish to use the NAG Library on JASMIN you will need to request access via the JASMIN Accounts Portal at:\nhttps://accounts.jasmin.ac.uk/services/additional_services/nerctools/\nThis will give your JASMIN user account access to the \u0026ldquo;nerctools\u0026rdquo; Unix Group that is used to limit access to NAG.\nLoading the NAG Library for use on JASMIN \u0026nbsp; The NAG library is made available via module command which is only available once you are on the scientific analysis servers and LOTUS cluster on JASMIN. In addition to loading a module for the library, you will usually need to load a module for the compiler you are using. For example:\nmodule load contrib/nag/25 module list Currently Loaded Modulefiles: 1) intel/fce/15.0.090 2) contrib/nag/25 The NAG library is loaded as well as the Intel Fortran compiler. Now you can compile your code and link to the NAG library, for example:\nifort your_code.f90 -lnag_nag -o your_code.exec How to find a NAG library routine \u0026nbsp; Please search the NAG documentation when looking for specific routines:\nhttps://www.nag.co.uk/numeric/fl/nagdoc_fl25/html/indexes/kwic.html\nHow to use the NAG library \u0026nbsp; The following shows the directory and file organisation of the materials.\n/apps/contrib/nag/fll6i25dcl/ |- in.html (Installer\u0026#39;s Note - this document) |- doc -|- un.html (Users\u0026#39; Note) | |- lic_agr.txt (license agreement) | | |- libnag_nag.a (static self-contained library | | including NAG BLAS/LAPACK) | |- libnag_nag.so.25 (shareable self-contained library | | including NAG BLAS/LAPACK) | |- libnag_nag.so (symbolic link pointing at |- lib -| libnag_nag.so.26) | |- libnag_mkl.a (static library requiring | | MKL BLAS/LAPACK) | |- libnag_mkl.so.25 (shareable library requiring | | MKL BLAS/LAPACK) | |- libnag_mkl.so (symbolic link pointing at | libnag_mkl.so.26) fll6i25dcl -| |- nag_interface_blocks -|- * (interface blocks for Intel compiler) | | |- source --|- ??????e.f90 | | |- examples -|- data ----|- ??????e.d | | |- ??????e.opt | | | |- results -|- ??????e.r | | |- nag_example* (scripts to compile and run |- scripts -| NAG example programs) | | | |- nag_recompile_mods (script to recompile | interface blocks) | |- c_headers -|- * (C/C++ header file and information) | |- mkl_intel64_11.2.0 -|- * (Intel Math Kernel Library) | |- rtl -|- * (Intel compiler run-time libraries) | | |- bin -|- * (directories of license management | | binaries for supported platforms) |- license -|- README.txt | |- doc -|- * (license management documentation) Further information \u0026nbsp; See the full NAG library manual at:\nhttps://www.nag.co.uk/numeric/fl/nagdoc_fl26/html/frontmatter/manconts.html"
      })
      .add(
      
      
      {
        id: 81,
        tag: "en",
        href: "/docs/short-term-project-storage/faqs-storage/",
        title: "New storage FAQs and issues",
        description: "New storage FAQs and issues",
        
        
        content: "\u0026nbsp; This article was originally written in 2018/19 to introduce new forms of storage which were brought into production at that stage. Some of the information and terminology is now out of date, pending further review of JASMIN documentation. Workflows with some of the issues highlighted below will have a knock on effect for other users, so please take the time to check and change your code to make appropriate use of new storage system. If used correctly, the new storage offers us a high performance scalable file system, with the capability for object storage as tools and interfaces evolve, and we can continue to serve the growing demand for storage in the most cost effective manner.\nWe understand these changes may cause you some extra work, but we hope that you can understand why they were necessary and how to adapt to these changes. We will continue to add to this page when new issues or solutions are found.\n1. Known cases where parallel write can occur (may be unknowingly to you!): \u0026nbsp; Use of MPI-IO or OpenMPI \u0026nbsp; Parallel threads can update the same file concurrently on same or from different servers.\nSuggested solution: use a /work/scratch-pw* volume which is PFS (but not /work/scratch-nopw* !), then move output to SOF storage.\nWriting all the logs from a LOTUS job or job array to the same output or log file \u0026nbsp; Suggested solution: see job submission advice here showing how to use SBATCH options to use distinct output and log files for each job, or element of a job array.\nDeleting a file via one host before another host has closed it \u0026nbsp; This is a form of parallel write truncation\nSuggested solution: take care to check for completion of 1 process before another process deletes or modifies a file. Be sure to check a job has completed before interactively deleting files from any server you are logged into (eg. sci1.jasmin.ac.uk)\nAttempting to kill a process that was writing/modifying files, but not checking that it has been killed before starting a replacement process which attempts to do the same thing \u0026nbsp; This can happen with rsync leading to duplicate copying processes.\nSuggested solution: check for successful termination of 1 process before starting another.\nOpening the same file for editing in more than one editor on the same or different servers \u0026nbsp; Here’s an example of how this shows up using “lsof” and by listing user processes with “ps”. The same file “ISIMIPnc_to_SDGVMtxt.py” is being edited in 2 separate “vim” editors. In this case, the system team was unable to kill the processes on behalf of the user, so the only solution was to reboot sci1.\nlsof /gws/nopw/j04/gwsnnn/ COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME vim 20943 fbloggs cwd DIR 0,43 0 2450 /gws/nopw/j04/gwsnnn/fbloggs/sdgvm/ISIMIP vim 20943 fbloggs 4u REG 0,43 24576 2896 /gws/nopw/j04/gwsnnn/fbloggs/sdgvm/ISIMIP/.ISIMIPnc_to_SDGVMtxt.py.swp vim 31843 fbloggs cwd DIR 0,43 0 2450 /gws/nopw/j04/gwsnnn/fbloggs/sdgvm/ISIMIP vim 31843 fbloggs 3r REG 0,43 12111 2890 /gws/nopw/j04/gwsnnn/fbloggs/sdgvm/ISIMIP/ISIMIPnc_to_SDGVMtxt.py ps -ef | grep fbloggs ...... fbloggs 20943 1 0 Jan20 ? 00:00:00 vim ISIMIPnc_to_SDGVMtxt.py fbloggs 31843 1 0 Jan20 ? 00:00:00 vim ISIMIPnc_to_SDGVMtxt.py smc_1D-2D_1979-2012_Asia_NewDelhi.py Suggested solution: If you are unable to kill the processes yourself, contact the helpdesk with sufficient information to ask for it to be done for you. In some cases, the only solution at present is for the host or hosts to be rebooted.\n2. Issues with small files \u0026nbsp; The larger file systems in operation within JASMIN are suitable for storing and manipulating large datasets and not currently optimised for handling small ( \u0026lt;64kBytes) files. These systems are not the same as those you would find on a desktop computer or even large server, and often involve many disks to store the data itself and metadata servers to store the file system metadata (such as file size, modification dates, ownership etc). If you are compiling code from source files, or running code from python virtual environments, these are examples of activities which can involve accessing large numbers of small files.\nLater versions of our PFS systems handled this by using SSD storage for small files, transparent to the user. SOF however, can’t do this (until later in 2019), so in Phase 4, we introduced larger home directories based on SSD, as well as an additional and larger scratch area.\nSuggested solution: Please consider using your home directory for small- file storage, or /work/scratch-nopw2 for situations involving LOTUS intermediate job storage. It should be possible to share code, scripts and other small files from your home directory by changing the file and directory permissions yourself.\nWe are planning to address this further in Phase 5 by deploying additional SSD storage which could be made available in small amounts to GWSs as an additional type of storage. [Now available: please ask about adding an \u0026ldquo;SMF\u0026rdquo; volume to your workspace]\nIssues writing netCDF3 classic files to SOF storage type \u0026nbsp; Writing netCDF3 classic files to SOF storage e.g. /gws/nopw/j04/* should be avoided. This is due to the fact that operations involving a lot of repositioning of the file pointer (as happens with netCDF3 writing) has similar issues from writing large numbers of small files to SOF storage (known as QB ).\nSuggested solution: It is more efficient to write netCDF3 classic files to another filesystem type (e.g. /work/scratch/pw* or /work/scratch-nopw2) and then move them to a SOF GWS, rather than writing directly to SOF.\n3. \u0026ldquo;Everything\u0026rsquo;s running slowly today\u0026rdquo; \u0026nbsp; This can be due to overloading of the scientific analysis servers (sci*.jasmin.ac.uk) which we provide for interactive use. They’re great for testing a code and developing a workflow, but are not designed for actually doing the big processing. Please take this heavy-lifting or long-running work to the LOTUS batch processing cluster, leaving the interactive compute nodes responsive enough for everyone to use.\nSuggested solution: When you log in via one of the login*.jasmin.ac.uk nodes, you are shown a \u0026lsquo;message of the day\u0026rsquo;: a list of all the sci* machines, along with memory usage and the number of users on each node at that time. This can help you select a less-used machine (but don’t necessarily expect the same machine to be the right choice next time!)."
      })
      .add(
      
      
      {
        id: 82,
        tag: "en",
        href: "/docs/batch-computing/orchid-gpu-cluster/",
        title: "Orchid GPU cluster",
        description: "Orchid GPU cluster",
        
        
        content: "This article provides details on JASMIN\u0026rsquo;s GPU cluster, named ORCHID.\nGPU cluster spec \u0026nbsp; The JASMIN GPU cluster is composed of 16 GPU nodes:\n14 x standard GPU nodes with 4 GPU Nvidia A100 GPU cards each 2 x large GPU nodes with 8 Nvidia A100 GPU cards ORCHID GPU cluster Request access to ORCHID \u0026nbsp; Before using ORCHID on JASMIN, you will need:\nAn existing JASMIN account and valid jasmin-login access role: Apply here\u0026nbsp; \u0026nbsp; \u0026nbsp; Subsequently (once jasmin-login has been approved and completed), the orchid access role: Apply here\u0026nbsp; \u0026nbsp; \u0026nbsp; The jasmin-login access role ensures that your account is set up with access to the LOTUS batch processing cluster, while the orchid role grants access to the special LOTUS partition used by ORCHID.\nHolding the orchid role also gives access to the GPU interactive node.\nNote: In the supporting info on the orchid request form, please provide details on the software and the workflow that you will use/run on ORCHID.\nTest a GPU job \u0026nbsp; Testing a job on the JASMIN ORCHID GPU cluster can be carried out in an interactive mode by launching a pseudo-shell terminal Slurm job from a JASMIN scientific server e.g. sci2:\nsrun --gres=gpu:1 --partition=orchid --account=orchid --pty /bin/bash srun: job 24096593 queued and waiting for resources srun: job 24096593 has been allocated resources # you are now on gpuhost16 The GPU node gpuhost016 is allocated for this interactive session on LOTUS\nNote that for batch mode, a GPU job is submitted using the Slurm command \u0026lsquo;sbatch\u0026rsquo;:\nsbatch --gres=gpu:1 --partition=orchid --account=orchid gpujobscript.sbatch or by adding the following preamble in the job script file\n#SBATCH --partition=orchid #SBATCH --account=orchid #SBATCH --gres=gpu:1Note 1: gpuhost015 and gpuhost016 are the two largest nodes with 64 CPUs and 8 GPUs.\nNote 2: CUDA Version: 11.6\nNote 3: The Slurm batch partition/queue orchid has a maximum runtime of 24 hours and the default runtime is 1 hour. The maximum number of CPU cores per user is limited to 8 cores. If the limit is exceeded then the job is expected to be in a pending state with the reason being QOSGrpCpuLimit\nGPU interactive node \u0026nbsp; There is an interactive GPU node gpuhost001.jc.rl.ac.uk, with the same spec as other Orchid nodes, that you can access via a login server to prototype and test your GPU code prior to running as a batch job.\nssh -A gpuhost001.jc.rl.ac.uk # you are now on gpuhost001 Software Installed on the GPU cluster (to be updated) \u0026nbsp; CUDA drivers 10.1, and CUDA libraries 10.0, 10.1 and 11.4 CUDA DNN (Deep Neural Network Library) NVIDIA container runtime (see notes below) NGC client (GPU software hub for NVIDIA) Singularity 3.7.0 - which supports NVIDIA/GPU containers SCL Python 3.6"
      })
      .add(
      
      
      {
        id: 83,
        tag: "en",
        href: "/docs/software-on-jasmin/postgres-databases-on-request/",
        title: "Postgres databases on request",
        description: "Postgres databases on request",
        
        
        content: "Introduction \u0026nbsp; This article explains that users may request access to a PostgreSQL (known as Postgres) database on JASMIN for use with scientific workflows.\nOverview of the user database service \u0026nbsp; There are a large number of different workflows on JASMIN and it is common for users to require access to persistent storage of information about the progress of a workflow. In some cases, it is appropriate for users to save information in a relational database. Examples might be to create/update/delete data records (when working with small results) or to store the success/failure of batch tasks (running on LOTUS).\nTo meet this need, a user database service is available on request. The service provides secured access to a Postgres database that is accessible from the interactive and batch compute nodes on JASMIN. An individual user, or group of users, can be issued with login credentials to enable read and/or write access to the database.\nHow to request a Postgres database for use on JASMIN \u0026nbsp; In order to request a Postgres database from the user database service, please ensure you have a JASMIN Login account and then send a message to the JASMIN Helpdesk. You should include the following information in your message:\nstate that you would like a user database set up your JASMIN user ID Postgres details: database name, database user account name the expected size of the database (fully populated) machines (inside JASMIN) from which you would like to contact the database If you require backups of the database to be made. Postgres extensions \u0026nbsp; The Postgres installation includes the following extension:\nPostGIS\u0026nbsp; Backups \u0026nbsp; By default we make daily backups of the databases, which are kept for a week. We keep a weekly backup for a month and a monthly backup for 6 months. These intervals may be subject to change, so if you have particular concerns about backups please let us know. If your database is particularly large we may either make less frequent backups or not make backups at all. We will discuss any particular backup requirements you may have when we set up your database.\nYou should contact the JASMIN Helpdesk to request access to previous backups.\nRestrictions and limitations \u0026nbsp; Please note that the following restrictions and limitations apply to the user database service:\nWe cannot provide training in SQL or the use of relational databases: please ensure that you have the appropriate experience before requesting access. There is a size limit on the server and the disk that the user databases are housed on: if you expect to store many GBs of data then please discuss this with the JASMIN Team. The database cannot be made accessible outside the JASMIN firewall: it is intended to support applications and workflows that take place inside JASMIN. The database should not be considered as a long-term data store: you should migrate any content elsewhere if you intend to keep it for the medium or long term."
      })
      .add(
      
      
      {
        id: 84,
        tag: "en",
        href: "/docs/uncategorized/processing-requests-for-resources/",
        title: "Processing requests for resources",
        description: "Processing requests for resources",
        
        
        content: "This article is for consortium managers and explains:\nThe overall process and role of consortium manager How to process a request for new resources for a service, submitted by a project How to process a request for additional resources on an existing project\u0026rsquo;s service Introduction \u0026nbsp; Please make sure you have read the article \u0026ldquo;Requesting resources\u0026rdquo; to understand how the process works from the requester\u0026rsquo;s point of view.\nThis article will show you how to process requests for resources, but also show you what you need to consider when doing so.\nOverall process \u0026nbsp; The overall process for handling requests for resources from projects is summarised as follows. It all happens via the JASMIN Projects Portal.\nA project owner will have created a record representing a project for you to review This will come to you for review because they have selected your consortium as the most relevant to their work. But this means that the resources they are requesting need to come out of your consortium allocation. The project record should contain: A project description Requests for 1 or more services. Each proposed service (e.g., a Group Workspace or a Cloud Tenancy) can have 1 or more requirements for resources For a Group Workspace service, these could be requirements for disk or tape storage For a Cloud Tenancy service, these could be requirements for disk, CPU and memory resources for the tenancy Once all the requirements for a service have been agreed with the project owner, you, as consortium manager can submit the request for provisioning by the JASMIN team. Different services on the same project can be provisioned separately: for example, we can provision the Group Workspace resources while you\u0026rsquo;re still discussing what\u0026rsquo;s needed for a cloud tenancy. But all the requirements for a particular service (for example, disk and tape, for a Group Workspace) need to be agreed before it can be submitted for provisioning. If necessary, certain requirements can simply be rejected and excluded from the submission and can be added later. Requests made by projects directly to the JASMIN team will be referred back to this process, as it\u0026rsquo;s essential that we manage valuable resources in an organised manner, involving you as consortium manager to make decisions for your consortium\u0026rsquo;s allocations. So this does involve active engagement on your part. Once resources have been provisioned, you should be notified so that you can track the progress of the request on behalf of the project. Role of the consortium manager \u0026nbsp; Your task when reviewing should be to:\nCheck that the project has selected the appropriate consortium: does this activity sit within your domain? Scrutinise the project\u0026rsquo;s request for use of your allocation of consortium resources for this project. Questions to consider are: Do the proposed resource requirements sound reasonable? Have they properly considered using shared services like scratch and XFC to minimise the need for their own dedicated resources? For example: Instead of 100TB SOF for their Group Workspace, could they manage with 25TB, knowing that copious scratch space is nearly always available? Could some of the 100TB go on tape first, \u0026ldquo;streaming\u0026rdquo; their processing so that only some fraction is needed on disk at a time? Have they asked for tape resources alongside their disk space? (this would reassure you that they\u0026rsquo;ve considered a sensible workflow like above, but you might want to discuss with them). It\u0026rsquo;s reasonable to ask for an equivalent amount of space on tape as on disk. Historically this has usually been provisioned by default anyway, but we do want to capture what the project actually plans to use. Is the proposed workflow free of unnecessary duplication of data already available elsewhere on JASMIN, either in the CEDA Archive or other Group Workspaces (which can be processed in place rather than needing to be copied)? Some of this information will be in the project description but feel free to contact the project owner to gather more details yourself to form your opinion. Are the start and end dates realistic? You will need to reclaim your consortium\u0026rsquo;s resources once a project has finished (in order to support other projects from your allocation), so it\u0026rsquo;s important that these dates are agreed and regularly reviewed. Does the project actually need all the requested resources initially, or could they manage with some fraction to start with? \u0026ldquo;Hogging\u0026rdquo; disk space (or other resources), but not using it, wastes expensive resources. Is there a date beyond which the data could be moved off disk onto tape, freeing up disk? The project\u0026rsquo;s requirements can be modified during its lifetime to achieve this, but this should be considered (at the start) as a way to \u0026ldquo;sunset\u0026rdquo; the disk requirements while keeping some data still available after the active phase of the project. Group Workspace storage is short-term storage for the duration of a project only. Keeping data in Group Workspace disk storage in an open-ended way is bad for a number of reasons: other projects won\u0026rsquo;t have the resources they need, plus there are a number of data-sharing services attached to the CEDA Archive (such as, enabling other projects to discover the data) which make this a much better place to share data from, with all the benefits of professional data curation. The disk requirement for Group Workspaces should only be allocated for the active phase of the project where working space is needed. Longer-term visibility of any data produced should be addressed by involving the CEDA Archive team at the project planning stage. Processing a request for new resources \u0026nbsp; Log in to the JASMIN Projects Portal\nThis requires your JASMIN credentials (so you need to have a JASMIN account to proceed). Two-factor authentication is used: you can opt to send a verification code to the email address registered with your JASMIN account, then enter that code to proceed. Check your spam folder if the message doesn\u0026rsquo;t appear.\nFollow the \u0026ldquo;Consortia\u0026rdquo; link at the top, to show all the consortia. The one(s) you are responsible for will have a \u0026ldquo;Go to consortium\u0026rdquo; button.\nClick \u0026ldquo;Go to consortium\u0026rdquo;\nThis screen has 3 tabs: we are looking at the \u0026ldquo;overview\u0026rdquo; tab first, showing your how much of each type of resource is committed (provisioned) against the allocated resources for your consortium.\nGo to the \u0026ldquo;Projects\u0026rdquo; tab. If you have any projects with outstanding items for review, the number of projects will be indicated next to the \u0026ldquo;Projects\u0026rdquo; tab.\nHere we can see all the projects in this consortium: scroll down to see \u0026ldquo;cards\u0026rdquo; for all the projects. The tab indicated that there were 2 to be reviewed and these are labelled here too.\nClick \u0026ldquo;Go to Project\u0026rdquo; for the one you want to review, to see the project overview screen.\nThe \u0026ldquo;Overview\u0026rdquo; screen for a project gives you the timeline of what\u0026rsquo;s happened (most recent first) so you can see the description and any comments.\nNow go to the \u0026ldquo;Services\u0026rdquo; tab, to see what service(s) this project thinks it needs, and what resources are requested for those services:\nIn this case, they\u0026rsquo;re just asking for a Group Workspace, and have documented a requirement for 10 TB of SOF disk space, between the dates shown. For now, we\u0026rsquo;ll just consider how to approve that one request (but you could encourage them to ask for tape space as well, then approve both together).\nThe SOF requirement is in the \u0026ldquo;REQUESTED\u0026rdquo; state, meaning it\u0026rsquo;s awaiting your review, so click the \u0026ldquo;?\u0026rdquo; icon, to review that requirement:\nHere, you can see that this requirement for 10 TB SOF of SOF disk is OK in terms of your consortium\u0026rsquo;s overall allocation for SOF (1.6 PB), and current commitments (770.2 TB or 48%) against that allocation. But only you know what other projects are in the pipeline in your science domain:\nis there some big project on the horizon which will need lots of space in the near future? if you\u0026rsquo;re struggling for space, are there other projects which you could ask to give up some or all of their disk space, if they\u0026rsquo;ve finished their work? if they\u0026rsquo;ve asked for particular types of disk space (PFS, SSD or HPOS), have they justified why? The default storage type for Group Workspaces should be SOF, but there may be reasons why others are more appropriate, e.g. HPOS (Object Storage) for visibility inside / outside of JASMIN (to be encouraged!) SSD (Solid State Disk) for small file storage (but very limited amounts available, normally 100GB at a time) PFS (Parallel File System) for workflows which absolutely must be able to write in parallel to the same file from multiple processes (\u0026hellip;but there are 2 PB of scratch space available for this purpose, so consider carefully). If you want to suggest changes to the project (e.g. you think they\u0026rsquo;ve picked the wrong type) you can \u0026ldquo;Reject\u0026rdquo; with comments, and they can re-submit the request.\nIf you\u0026rsquo;re happy to approve, click \u0026ldquo;Approve\u0026rdquo;:\nThe SOF requirement now has status \u0026ldquo;APPROVED\u0026rdquo; so (as long as there are no other requirements in \u0026ldquo;REQUESTED\u0026rdquo; state), you can click \u0026ldquo;Submit for provisioning\u0026rdquo;.\nIf there are other requirements that have been requested, you either need to approve them too, or reject them so that you can agree acceptable resource request with the project owner.\nIf submitted, the requirement will then have the status \u0026ldquo;AWAITING PROVISIONING\u0026rdquo; and the JASMIN team will pick up the request to arrange provision of the resources.\nOnce the JASMIN team has completed provisioning the resources, the status changes to \u0026ldquo;PROVISIONED\u0026rdquo; and the location is confirmed: in this case giving the path to the disk space now that\u0026rsquo;s now available.\nAt this point, the project owner who requested the resources would also be notified to check the status on the portal, so should be able to pick up the location, but you may wish to check with them yourself, to track the request to completion.\nProcessing a request for additional resources \u0026nbsp; Where a project already exists, a project owner can submit a request for changes to resources on an existing service, or could request an additional service (e.g. adding a cloud tenancy where there\u0026rsquo;s already a Group Workspace). Adding an additional service should work as described above, but reviewing a request to modify resources on an existing service, is shown below:\nWe start from the project overview screen (so check above for steps to reach that):\nWe can see in the comments that something has been requested: those comments are attached by the project owner to provide extra context to the request.\nGo to the Service tab to review further:\nHere we can see the original 10 TB which is \u0026ldquo;PROVISIONED\u0026rdquo; but above it is the request for the additional 1 TB, with status \u0026ldquo;REQUESTED\u0026rdquo;.\nClick the \u0026ldquo;?\u0026rdquo; to review:\nFrom the consortium manager\u0026rsquo;s point of view, it\u0026rsquo;s the same process as before, so go through the same steps to scrutinise the request.\nReject the request (with comments) if you want the project owner to change things, or approve it if you\u0026rsquo;re happy:\nNow the request is marked as \u0026ldquo;APPROVED\u0026rdquo;, and since we have no other requests in \u0026ldquo;REQUESTED\u0026rdquo; state for you to review, you can click \u0026ldquo;Submit for provisioning\u0026rdquo;.\nOnce you have submitted it, the request is marked \u0026ldquo;AWAITING PROVISIONING\u0026rdquo; for the JASMIN team to pick up.\nIn this case, we\u0026rsquo;re adding space to the same service, so when it comes to recording what\u0026rsquo;s provisioned, the 10 TB \u0026amp; 1 TB \u0026ldquo;chunks\u0026rdquo; will be combined (in terms of how they\u0026rsquo;re recorded here), reflecting the fact that the JASMIN team will have simply expanded the size of the (single) disk volume. This makes sense if the project has asked for more space, but the total space is needed until the end of the whole project. So the previous 10TB (the record, not the actual disk) has been marked \u0026ldquo;DECOMMISSIONED\u0026rdquo;:\nAn alternative, which might be applicable in some cases, is where the extra space \u0026ldquo;boost\u0026rdquo; is only needed for a shorter period of time, as shown by the different end dates to the 2 requirements below. They\u0026rsquo;re both referring to the same physical storage, but the extra 1 TB space \u0026ldquo;expires\u0026rdquo; first.\nProcessing requests for resource types other than storage \u0026nbsp; The process for reviewing requests for other resource types, such as those needed for cloud tenancies, is the same as above. Further examples may follow here as needed."
      })
      .add(
      
      
      {
        id: 85,
        tag: "en",
        href: "/docs/interactive-computing/project-specific-servers/",
        title: "Project-specific servers",
        description: "Project-specific servers",
        
        
        content: "\u0026nbsp; Deprecated feature documented here to provide information about how to access existing instances. Project-specific servers are no longer provided on request, as most use cases can be satisfied by a tenancy in the JASMIN cloud. This article introduces the project specific servers. It covers:\nWhat is a project-specific server? \u0026nbsp; Previously, projects could be provided with dedicated servers built with specific software required by the project, or where access needs to be restricted to members of a project or institution.\nGet Access \u0026nbsp; On the JASMIN accounts portal, you can apply for access to an existing Project VM.\nStep 1: Select Project VMs from the Discover Services menu on the left\ndiscover services menu Step 2: You can either browse the page listing or do a search on the Project VMs. For example here using CEDA as a keyword search and to apply for access to CEDA_scisup, click apply or look into More information\nlocate relevant server apply for access provide supporting information and submit request request pending"
      })
      .add(
      
      
      {
        id: 86,
        tag: "en",
        href: "/docs/for-cloud-tenants/provisioning-tenancy-sci-vm-managed-cloud/",
        title: "Provisioning a Sci VM in a Managed Cloud Tenancy",
        description: "Provisioning a Sci VM in a Managed Cloud Tenancy",
        
        
        content: "This article is for admins and managers of managed-cloud tenancies and shows how to provision a sci VM within one. It involves the following:\nBecoming a member of a managed cloud tenancy Provisioning a VM A \u0026ldquo;sci vm\u0026rdquo; is essentially the same as the general-access scientific analysis servers, but created within a specific tenancy aimed at a certain group of users. The manager/deputy then has the responsibility to stop/start/restart or redeploy the VM, and to control who can access it.\nThe managed cloud tenancy has four access roles:\nMANAGER role: can approve DEPUTY, ADMIN, and USER role access requests DEPUTY manager role: can approve ADMIN and USER role access requests ADMIN role: can access the cloud portal and can restart or provision the Sci VM USER role: can log in into the sci VM from a JASMIN login node Apply for access to the Sci tenancy \u0026nbsp; A managed cloud tenancy is accessible via the JASMIN cloud portal\u0026nbsp; . Access is controlled by a service corresponding to the name of the tenancy: these services are listed under Sci Analysis VMs\u0026nbsp; category of \u0026ldquo;My Services\u0026rdquo;.\nAccess the tenancy \u0026nbsp; With an ADMIN role, you can log in to the JASMIN cloud portal using the same credentials for signing into the JASMIN accounts portal.\nYou will be presented with the \u0026ldquo;Dashboard\u0026rdquo; page -below- showing the tenancies you have access to. On the dashboard, select the organization representing the tenancy to find out the VM provisioned within a given tenancy, e.g ncas-sci-M\ndashboard showing tenancies available to this user Note: The \u0026ldquo;ncas-sci-M\u0026rdquo; tenancy shown below has 0 machines as this is a new tenancy. We will proceed next to the provisioning of a virtual machine.\nProvision a virtual machine \u0026nbsp; Step 1: Select \u0026ldquo;Machines\u0026rdquo; from the top menu, then click \u0026ldquo;New machine\u0026rdquo; to create a new VM. Choose a name for the new VM. Then select a size from the drop-down menu which shows the catalog of VM template size. For example, select \u0026ldquo;j4.large\u0026rdquo; which allocates 8 CPUs and 32GB of RAM resources for the new VM\nIMPORTANT: A Sci machine should be deployed with a minimum of 2 GB RAM\nIMPORTANT : A Sci machine name should not exceed 8 characters long. The preferred naming format is sci e.g. sci1\ndialogue for creating a new VM The VM with the chosen name ncas-sci1 is created and it is running as shown below.\nvm now shown in dashboard Step 2: Attach an external IP to the new VM by clicking \u0026ldquo;Actions\u0026rdquo; and selecting \u0026ldquo;Attach external IP\u0026rdquo;. Note that you can restart the VM from the \u0026ldquo;Actions\u0026rdquo; menu.\nattach external IP (1) Step 3: From the box that pops up -see image below- click on the \u0026ldquo;+\u0026rdquo; (green button) to add an IP. Then click on the down arrow next to \u0026ldquo;Select an external IP\u0026rdquo; you will see the IP address to assign to the machine, select the IP and click attach IP\nattach external IP (2) Step 4: Click \u0026ldquo;Attach IP\u0026rdquo;\nImportant note: As ADMIN and MANAGER of a Sci tenancy, you should note the \u0026ldquo;External IP\u0026rdquo; as this is the IP address you will need to provide to your users in order for them to connect to the machine via SSH using a JASMIN login server.\nsummary dashboard showing IP allocated. Step 5: An overview of the resources used by the VM is shown below\nresources dashboard Note 1: Only ADMIN and MANAGER roles have access to the JASMIN cloud portal and can provision VMs. ADMIN and MANAGER roles of a Sci tenancy will not be granted root access.\nNote 2: ADMIN and MANAGER roles will not allow you to SSH into the Sci VM. It is necessary to have a USER role to do so.\nConnect to the VM \u0026nbsp; From a JASMIN login server, login to the machine using the External IP address. In the same way, as you login to a JASMIN scientific server via login1. Your initial connection to JASMIN from your local machine needs to have your SSH key loaded in your SSH authentication agent, and you must have SSH Agent Forwarding enabled \u0026ldquo;-A\u0026rdquo;, see also how MISSING LINK.\nterminal session showing connection to new VM Note that although the new provisioned Sci VM has a local hostname (in this example, sci1-202012041148.ncas-sci-m.jasmin.ac.uk ), this is NOT registered in any Domain Name Service (DNS) by default, and we are not able to arrange this for you, so you need to connect to the machine using its External IP address, not the name.\nNote : Users should report issues to the ADMIN and/or MANAGER of the tenancy based SCI VM initially, rather than the JASMIN team. If the issue cannot be resolved by the ADMIN and/or MANAGER, they should contact the JASMIN helpdesk."
      })
      .add(
      
      
      {
        id: 87,
        tag: "en",
        href: "/docs/software-on-jasmin/python-virtual-environments/",
        title: "Python Virtual Environments",
        description: "Python Virtual Environments",
        
        
        content: "This article describes how you can use \u0026ldquo;virtual environments\u0026rdquo; to install Python packages that are not provided in the common software environments on JASMIN. You might wish to do this if you want to use different packages/versions from those installed on the system, or if you have requested for a package to be installed system-wide but wish to start using it before this request can be acted upon.\nTo decide whether you should use a Python virtual environment or a Conda environment for this purpose, see: overview of software environments.\nWhat is a \u0026ldquo;virtual environment\u0026rdquo;? \u0026nbsp; A \u0026ldquo;virtual environment\u0026rdquo; is a self-contained directory tree that contains a Python installation for a particular version of Python (such as 2.7, 3.7, 3.8), plus a number of additional packages. It provides a very useful method for managing multiple environments on a single platform that can be used by different applications.\nCreating a virtual environment \u0026nbsp; As a pre-requisite, when using any modern Python (i.e. Python2.7 onwards), you shouldactivate a Jaspy environment before following the instructions below.\nPython allows you to create a directory containing a private virtual environment, into which you can install your packages of choice. This is done differently for python2 and python3, as follows:\n# Python 3 onwards: python -m venv /path/to/my_virtual_env # Python 2.7 (deprecated) virtualenv /path/to/my_virtual_env The path can be an absolute or relative path, but it should not already exist. Note: /path/to/my_virtual_env here (and also in the commands shown below) should be replaced by the actual path where you choose to create your virtual environment.\nUsing the system \u0026ldquo;site-packages\u0026rdquo; with your virtual environment \u0026nbsp; Note that if you create a virtual environment using the above syntax, the packages initially installed in it will only be those in the standard Python library. This means, for example, that the numpy package (not in the standard library, but installed as part of Jaspy) will be unavailable unless you install it yourself. If you would prefer as a starting point to have all the add-on packages which have already been installed in Jaspy, then use instead:\npython -m venv --system-site-packages /path/to/my_virtual_env This will work for most packages in Jaspy. We have seen situations where one or two packages from Jaspy do not work in private virtual environments, and if you are affected by this then please see the \u0026ldquo;package-specific fixes\u0026rdquo; section below.\nActivating a virtual environment \u0026nbsp; Before the virtual environment can be used, it needs to be \u0026quot; activated \u0026ldquo;. This is done by running the activate script using the source command:\nsource /path/to/my_virtual_env/bin/activate (If you prefer, you can use . instead of source.)\nAfter you run the activate script, some environment variables will be set so that the python (or python2.7 (deprecated), python3) command will point to the one in the virtual environment, allowing installation and use of packages in that environment.\nYou can see that python points to the python executable in the virtual environment, with:\nwhich python /home/users/my_username/my_virtual_env/bin/python Note that you have to source the activate script in every shell (login session) in which you intend to use the virtual environment. If there is a particular virtual environment which you want to use consistently, you might consider putting the command to source the activate script in your $HOME/.bashrc file.\nIf you wish to deactivate the currently active virtual environment in a particular shell, just type deactivate. The environment variable changes will be undone, and you will again be using the system default set of packages. This is also reflected in the shell prompt.\nInstalling packages into a virtual environment \u0026nbsp; Once you have activated a virtual environment, the pip utility will be available. This allows package installation into the environment using the command:\npip install your_package pip is quite flexible what you can use for your_package. It can include:\na package name in the Python Package Index (PyPI) a URL pointing to a package repository the local path of a .tar.gz or .zip file containing the package source the local path of a directory containing the extracted package source the download URL of a .tar.gz or .zip file If the package requires other packages that are not already installed into the virtual environment, then pip will use the package\u0026rsquo;s requirements file to install them automatically from PyPI.\nOne thing to consider when doing this, is that some temporary space is needed by the install process. The location of this temporary space may be set by default to /tmp, which is restricted on the sci machines.\nYou might see this error, despite having ample free space in your own home directory:\nERROR: Could not install packages due to an OSError: \\ [Errno 122] Disk quota exceededIn order to avoid encountering this, you are advised to follow this advice to over-ride the TMPDIR environment variable, setting it to the location of somewhere you know have free space. Don\u0026rsquo;t forget to clean up afterwards!\nTo upgrade an existing package, use:\npip install --upgrade your_package If your Python package cannot be installed with pip for any reason, it can also be installed directly from the setup.py file after activating the virtual environment.\npython setup.py install To install a specific version of a package, this can be specified with:\npip install your_package==1.2.3 Inspecting the virtual environment \u0026nbsp; To list the packages installed into the virtual environment, with their version numbers, type:\npip freeze Using the virtual environment \u0026nbsp; Interactive use \u0026nbsp; After you have activated the virtual environment in your shell, any packages that you have installed into it can be imported into an interactive python session.\npython automatically uses python in your virtualenv The prompt changes to \u0026gt;\u0026gt;\u0026gt;:\nimport my_package Scripts \u0026nbsp; If a script is run using the python command on the command-line in a similar way to when starting an interactive Python session, this will use any virtual environment that has been activated in the calling shell.\npython my_script.py If an executable script is run using the #! mechanism, and the first line of the script has the hard-coded path to the executable in the virtual environment, then it is not necessary to activate the virtual environment in the calling shell.\nhead -n 1 myscript.py show the first line #!/path/to/my_virtual_env/bin/python3.7 chmod u+x myscript.py ensure that it is executable ./myscript.py run it As an alternative to hard-coding the path of the virtual environment, it is possible to use the /usr/bin/env approach to ensure that the script is run using whichever python executable is found via $PATH. The script will then run using any virtual environment that has been activated in the calling shell. This makes the script more portable, although at the expense of having to source the activate script.\nhead -n 1 myscript.py #!/usr/bin/env python3.7 chmod u+x myscript.py ./myscript.py Package-specific fixes \u0026nbsp; When using the --system-site-packages option in combination with Jaspy, it has been found that some packages provided by Jaspy (and which work correctly in the Jaspy environment itself) require fixes in order to use them in virtual environments that are created on top of Jaspy. In particular:\nif you use shapely, we suggest to reinstall this into your virtual environment using pip install --ignore-installed shapely after activating the environment if you use geopandas, you will need to reinstall shapely as above, and also when running python you will need to set an environment variable to enable it to find the spatialindex library. After loading Jaspy and activating the virtual environment, you could use either one of the following: export LD_LIBRARY_PATH=$CONDA_PREFIX/lib:$LD_LIBRARY_PATH export LD_PRELOAD=$CONDA_PREFIX/lib/libspatialindex.so:$CONDA_PREFIX/lib/libspatialindex_c.so Note that these environment variables could potentially also affect the behaviour of other Linux commands, although unlikely, so you might prefer to set them only for the python session (using a command of the form env variable_name=value python) rather than using export.\nif you use cartopy (also used by iris), you may need to create a symbolic link into your virtual environment to allow the correct loading of libgeos_c.so during import cartopy or import iris. To do this: ln -s $CONDA_PREFIX/lib/libgeos_c.so /path/to/my_virtual_env/lib/"
      })
      .add(
      
      
      {
        id: 88,
        tag: "en",
        href: "/docs/software-on-jasmin/quickstart-software-envs/",
        title: "Quickstart for activating/deactivating software environments",
        description: "Quickstart for activating/deactivating software environments",
        
        
        content: "This article provides a minimum quick-start guide for working with software environments on JASMIN.\nActivate (load) an environment \u0026nbsp; To activate an environment containing the \u0026ldquo;current\u0026rdquo; common software packages (including a modern Python):\nmodule load jaspy or for a specific version, see how to discover what versions are available\nTo activate additional packages (known as \u0026ldquo;jasmin-sci\u0026rdquo;):\nmodule load jasmin-sci Deactivate (unload) an environment \u0026nbsp; If you want to deactivate an environment that you have previously activated, do:\nmodule unload \u0026lt;env-id\u0026gt; Where \u0026ldquo;\u0026rdquo; is the name used when you activated the environment.\nWhich environment(s) should you use? \u0026nbsp; If you are not sure which environment(s) to use please see details on the overview of Jaspy and \u0026ldquo;jasmin-sci\u0026rdquo; environments page."
      })
      .add(
      
      
      {
        id: 89,
        tag: "en",
        href: "/docs/data-transfer/rclone/",
        title: "rclone",
        description: "A \"Swiss army knife\" tool for data transfers",
        
        
        content: "This article provides information about the rclone data transfer tool. In particular:\nwhat is rclone? installing rclone for yourself on JASMIN. configuring rclone Dos and Don\u0026rsquo;ts What is rclone? \u0026nbsp; rclone is a command-line utility which enables access to lots of different storage systems including object stores and cloud-based storage. It can also move data between directories act as an SFTP client so could be used to access files on JASMIN.\nIt is very well documented already, so rather than repeat that information here, this article highlights aspects relevant to its use on JASMIN.\nFurther information will follow in due course as our experience with this tool develops.\nInstalling rclone for yourself on JASMIN \u0026nbsp; First off, do not attempt to follow the documented instructions for installing on Linux. As a regular user, you do not have root/administrator permission and are not permitted to run scripts using sudo. Normally most utilities are already installed for you on JASMIN, but in this case you need to adapt the documented instructions so that you can safely install this in your OWN home directory. [That may change in the future if this tool proves useful].\nThe recommended procedure for installation on JASMIN is as follows:\nFetch and unpack the Linux binary distribution: (in your home directory on an xfer server)\ncurl -O https://downloads.rclone.org/rclone-current-linux-amd64.zip unzip rclone-current-linux-amd64.zip cd rclone-*-linux-amd64 Next, move the rclone executable to your own bin directory. You may need to create that directory if it does not exist already, and add it to your PATH environment variable in your ~/.bash_profile file.\n# only need these if these aren\u0026#39;t in place already in your own setup: mkdir ~/bin comment here # add this to your PATH (add to your ~/.bash_profile to make this permanent) export PATH=\u0026#34;~/bin:$PATH\u0026#34; # move the rclone executable mv rclone ~/bin/ # make the permissions on the file executable by you chmod 700 ~/bin/rclone Note that you will not have installed the man pages, so these will not be available: please consult the online documentation instead.\nConfiguring rclone \u0026nbsp; Configuring rclone is covered in the rclone documentation. Essentially you need to configure a \u0026ldquo;remote\u0026rdquo; representing each storage system you want to interact with. You can then use rclone to manage data between those \u0026ldquo;remotes\u0026rdquo;.\nDos and Don\u0026rsquo;ts \u0026nbsp; Please DO NOT use the following features on JASMIN (at least until further notice). Some of these features look useful, but more work is needed to understand if/how they can be used safely on JASMIN without causing problems. rclone mount (mounting a remote as a filesystem) - DO NOT USE rclone rcd (remote control daemon) - DO NOT USE rclone serve(serve remote over a protocol) - DO NOT USE You should safely be able to use the following, between remotes that you have configured: rclone copy rclone sync rclone lsd rclone ls ..(other basic commands) Help on a particular command is found using\nrclone \u0026lt;command\u0026gt; --help Further examples of useful ways of using rclone on JASMIN will follow\u0026hellip;"
      })
      .add(
      
      
      {
        id: 90,
        tag: "en",
        href: "/docs/getting-started/reconfirm-email-address/",
        title: "Reconfirm JASMIN account email address",
        description: "Reconfirm JASMIN account email address",
        
        
        content: "This article describes how to reconfirm the email address associated with your JASMIN account.\nFor security reasons, this is a process which you will be asked to repeat annually.\nOnce a year, you will receive an email asking you to reconfirm your email address. You will receive reminders to do this 2 months, 2 weeks and finally 2 days before the required date. Once you are within 2 months of the required date, you can carry out the steps below at any time within before the required date: the sooner the better.\nVisit your profile at the JASMIN Accounts Portal https://accounts.jasmin.ac.uk If you are already signed in you can get to your profile by following the link to \u0026ldquo;My JASMIN Account\u0026rdquo;, otherwise you will be automatically taken to your profile when you sign in. Click the “Confirm now” button in your JASMIN profile to request that an email containing a confirmation link is sent to your email address. If this button is not visible and instead you see the message \u0026ldquo;confirmed\u0026rdquo; next to your email address: already confirmed this indicates that your email address has already been confirmed and no further action is necessary.\nWait for the email to arrive, then click on the special one-time link within it. You need to complete this step within the time limit specified in the email (2 days). If the link has expired, you can repeat step 2 to generate a new link. Once you have successfully completed the process, your account profile page will be updated with a message confirming this. Look out for the reminder email in 10 months\u0026rsquo; time inviting you to re-confirm again. If you don’t complete the process before the required date, you may find that your account is suspended along with privileges attached to the account (e.g. access to group workspaces etc). However, neither your account nor any of your data be deleted , so please get in touch with the helpdesk to restore your access if this should happen.\nPlease also contact the helpdesk if:\nYou know that you will be away from access to your institutional email for a significant period (e.g. 1 year) You no longer need your JASMIN account You need to change your email address You cannot update the email address yourself, since a change of institution may affect your eligibility to some JASMIN services. See here for details of how to update other aspects of your JASMIN account."
      })
      .add(
      
      
      {
        id: 91,
        tag: "en",
        href: "/docs/uncategorized/requesting-resources/",
        title: "Requesting resources",
        description: "Requesting resources",
        
        
        content: "How projects and resources are managed \u0026nbsp; Resouces on JASMIN, such as storage and compute, are allocated to science communities separated into \u0026ldquo;consortia\u0026rdquo;. Each consortium has a manager: a representative of that science community who is in touch with its major activities and understands the resource requirements for projects in that domain. Representatives of individual projects should discuss requirements with their Consortium Manager, who is best placed to make decisions about the allocation of JASMIN resources within that consortium. Requirements can be documented using the “JASMIN Resource Management” tool, but need to be approved by a Consortium Manager before being passed to the JASMIN Team for provisioning.\nSee here for further details, including a list of current consortia and their managers.\nAccessing the JASMIN projects portal \u0026nbsp; The JASMIN projects portal provides a place to:\ndocument the resources required for a project (new projects, or changes to existing projects) submit those requirements for review track the provision of those resources Usually, you would only need to access the projects portal if you are:\nthe Principal Investigator (or their delegated project manager) for a project to document requirements for a project to invite other individuals (with a JASMIN account) who may wish to view and/or discuss the requirements a consortium manager to review/approve resource requirements Note: Please do not make requests yourself unless you are involved in the management of the project: speak to the project or group workspace (GWS) manager and ask them to make the request.\nThese users need to log in with their JASMIN account credentials, the same as those used for the JASMIN accounts portal. 2-factor authentication is in use, with verification codes sent to the email address associated with your JASMIN account (this is the same process used to access the JASMIN notebook service).\nOnce you have logged in, you are presented with a view of the projects where you are named as owner or collaborator (or, for consortium managers, where you are the relevant consortium manager). A further guide for consortium managers about how to process requests for resources is available here.\nCreate a project to record resource requirements \u0026nbsp; To create a new project:\nGo to \u0026ldquo;My Projects\u0026rdquo; Click \u0026ldquo;Start new project\u0026rdquo; Enter details for the project, as described below.\nA project can have several Services, such as:\na group workspace a managed cloud tenancy an external cloud tenancy [particular compute requirements*] some services are not yet able to be described/requested via this tool, but will be soon. please contact the helpdesk if you\u0026rsquo;re not able to describe what you need. To add the services needed for the project:\nIn the panel on the right, click \u0026ldquo;Add Service\u0026rdquo; Select the category of service required: in this case, we\u0026rsquo;re making requirements for a group workspace, but the available options are: Group Workspace (for shared disk storage for a project) External Tenancy VIO (for an external cloud tenancy on the VIO cloud platform) Managed Tenancy VIO (for a managed cloud tenancy on the VIO cloud platform) (please do not use the \u0026ldquo;\u0026hellip; Tenancy MCP \u0026quot; options as these will soon be removed) Provide a short name for the service Click \u0026ldquo;create\u0026rdquo;. A Service may have several requirements, but, for example, we could request 10 TB of SOF storage for our GWS:\nSOF (scale-out filesystem) is the usual type of storage used for GWS volumes, but you could also request:\nHPOS (high-performance object store available via an S3-like interface) PFS (parallel file system, by special request if certain workflows specifically need this) SSD (Solid State Disk, used for \u0026ldquo;small files\u0026rdquo; or \u0026ldquo;SMF\u0026rdquo; volumes for storing code or virtual environments to share within a GWS. It is assumed that you\u0026rsquo;ve considered carefully how you will do your work on JASMIN, with some knowledge of its services and components. You may find the following helpful:\nArticle: Understanding new JASMIN storage JASMIN workshop overview talk, explaining the main services offered by JASMIN how your request will be scrutinised by the relevant consortium manager. Once created, the requirements appear in the list, along with their start and end dates and status. This one is \u0026ldquo;REQUESTED\u0026rdquo;.\nClick \u0026ldquo;Submit for review\u0026rdquo; and the manager of the relevant consortium will be notified that they need to review the request, with status updated to \u0026ldquo;REQUESTED\u0026rdquo;.\nOnly a user with \u0026ldquo;OWNER\u0026rdquo; status on a project can submit the project for review. It\u0026rsquo;s best if one person coordinates with the consortium manager once the outline plan has been agreed with other project contacts (see inviting another user and joining a project, below)\nIf there are multiple requirements, make sure these are all documented so that the consortium manager can consider them all together, in context. Just repeat the process above for each additional requirement.\nThe project is marked as \u0026ldquo;UNDER REVIEW\u0026rdquo; while the requirements are being agreed.\nThe consortium manager may approve, reject or request changes to the requirements before they are agreed.\nOnce the consortium manager has agreed, the requirements are ready for provisioning: the JASMIN team will then manage the provisioning of the requested resources and the project contact will be notified when this is complete and the new resources available.\nInvite another user \u0026nbsp; By default, information in the projects portal is only visible by those nominated \u0026ldquo;collaborators\u0026rdquo; on the project, the relevant consortium manager, and the JASMIN Team (or others involved in the provision of JASMIN services). To share your plans for what\u0026rsquo;s needed on a project with other individuals, you can invite another user to the project:\nGo to \u0026ldquo;My Projects\u0026rdquo; In the panel on the right, click the link with the number of current collaborators Enter the email address of the other user you wish to invite, and press \u0026ldquo;Invite\u0026rdquo; Although you are inviting them by email address, they must have a JASMIN account in order to access the projects portal. Join an existing project by invitation from another user \u0026nbsp; If you have received an invitation code from an existing collaborator on a project, you can use it to join a project as follows:\nGo to \u0026ldquo;My Projects\u0026rdquo; Click \u0026ldquo;Join existing project\u0026rdquo; Enter the invitation code which the other user has sent you. Request additional resources for an existing project \u0026nbsp; You can add new requirements to a project once it has been PROVISIONED (but not while it\u0026rsquo;s already UNDER_REVIEW).\nTo add new requirements, go to \u0026ldquo;My Projects\u0026rdquo; and create the new requirement.\nFor example, if a GWS currently has 10 TB of SOF space provisioned, and the new and an additional 5 TB of space is needed, then:\nIf the GWS as a whole has the same end date, then create a new requirement for 15TB, with that end date, and submit this so that it can be reviewed. If it\u0026rsquo;s just a temporary / short-term boost of storage that\u0026rsquo;s needed consider whether scratch or XFC storage would suffice create a requirement for the additional storage only, confirming the start and end dates of the new storage in some cases, the end dates of the original storage will be out-of-date, so please agree new dates with your consortium manager as part of this process. Although these examples have concentrated on storage requirements, the same methods apply to requesting cloud tenancies. More detail on how to request these, and additional methods for documenting requirements for compute resources, will follow in due course.\nAlternatives \u0026nbsp; In some cases, it may not be appropriate to provide dedicated resources to certain projects. Your consortium manager should be able to help you look at other options. In some cases, a relevant project may already exist, and by discussion with the appropriate manager of that project, it may be possible for you to make use of those existing resources without the need to create a new one. There is a certain management overhead associated with setting up and operating each project\u0026rsquo;s dedicated services, which use expensive resources, so requests do have to be considered carefully.\nThe following \u0026ldquo;generic\u0026rdquo; Group Workspaces exist for general use by members of these communities and often solve the problem of a small GWS needed by an individual:\nncas_generic : (National Centre for Atmospheric Science) nceo_generic : (National Centre for Earth Observation) ceh_generic : (UK Centre for Ecology and Hydrology) In these cases, the relevant consortium manager is usually the manager of the \u0026ldquo;generic\u0026rdquo; workspace so can approve applications for access to these workspaces themselves.\nPlease consult the list of available group workspaces for other options.\nAnother alternative, for easily accessible short-term storage for an individual user is the JASMIN Transfer Cache (XFC) service."
      })
      .add(
      
      
      {
        id: 92,
        tag: "en",
        href: "/docs/getting-started/reset-jasmin-account-password/",
        title: "Reset JASMIN account password",
        description: "Reset JASMIN account password",
        
        
        content: "This article illustrates how to reset the password of your JASMIN account to access the JASMIN Accounts Portal. On the JASMIN Accounts Portal sign-in page, select \u0026ldquo;Forgotten password\u0026rdquo; on the \u0026ldquo;useful links\u0026rdquo; menu:\nFollow Forgotten password Step 1 : You will be directed to the following page. Enter your email address that is registered with your JASMIN account\nEnter email address Step 2: You will receive an email from the JASMIN accounts portal containing a link which can only be used once and it will expire in two days\nRead instructions Example of email from jasmin-accounts containing a link which can only be used once and it will expire in two days\nExample email Step 3: Enter the new password, confirm it and then click \u0026ldquo;Reset password\u0026rdquo;\nEnter new password \u0026 click Reset password Finally, you have now reset the password of your JASMIN account portal."
      })
      .add(
      
      
      {
        id: 93,
        tag: "en",
        href: "/docs/data-transfer/rsync-scp-sftp/",
        title: "rsync, scp, sftp",
        description: "Data Transfer Tools: rsync, scp, sftp",
        
        
        content: "This article tells you about some of the basic transfer tools available for use with JASMIN that work over an SSH connection:\nrsync (over SSH) scp sftp rsync over SSH \u0026nbsp; rsync is a file synchronisation and file transfer program for Unix-like systems that can minimise network data transfer by using a form of delta encoding such that only the differences between and source and destination data are actually transmitted. rsync can compress the data transferred further using zlib compression and SSH or stunnel can be used to encrypt the transfer.\nrsync is typically used to synchronise files and directories between two different systems, one local and one remote. For example, the command:\nrsync mydata remoteuser@remotehost:/data/ will use SSH to connect as remoteuser to remotehost. Once connected, it will invoke another copy of rsync on the remote host, and then the two programmes will talk to each other over the connection, working together to determine which parts of mydata are already on the remote host and don\u0026rsquo;t need to be transferred over the connection.\nThe generic syntax is:\nrsync [OPTION] ... SRC [SRC] ... [USER@]HOST:DEST rsync [OPTION] ... [USER@]HOST:SRC [DEST] \u0026hellip;where SRC is the file or directory (or a list of multiple files and directories) to copy from, and DEST represents the file or directory to copy to. (Square brackets indicate optional parameters.)\nFor more information visit the official rsync website.\nrsync example with JASMIN \u0026nbsp; Here is a simple example using rsync over SSH to your home directory copy a file to a Group Workspace on JASMIN:\nexec ssh-agent $SHELL ssh-add ~/.ssh/id_rsa_jasmin # local path to your private key file rsync myfile \u0026lt;username\u0026gt;@xfer1.jasmin.ac.uk:/gws/nopw/j04/myproject/data/ NOTE: The first two lines are the standard method for setting up the SSH agent in order to allow connections without prompting for a passphrase each time.\nscp \u0026nbsp; scp is another basic command-line tool for secure copying between two machines. It is installed as part of most SSH implementations and comes as standard on the JASMIN transfer servers. scp is the secure analogue of the rcp command. Typically, the syntax of scp is like the syntax of cp (copy):\nTo copy a file to a host:\nscp myfile remoteuser@remotehost:directory/target To copy a file (or directory) from a host to the local system:\nscp remoteuser@remotehost:directory/source target scp -r remoteuser@remotehost:directory/source_folder target_folder Note that if the remote host uses a port other than the default of 22, it can be specified in the command. For example, copying a file from host over a non- standard SSH port (2222):\nscp -P 2222 remoteuser@remotehost:directory/source target For more information on scp please visit the following website.\nsftp \u0026nbsp; sftp is a similar command-line tool to scp, but the underlying SFTP protocol allows for a range of operations on remote files which make it more like a remote file system protocol. sftp includes extra capabilities such as resuming interrupted transfers, directory listings, and remote file removal.\nFor basic transfer of a file on JASMIN to the local machine:\nsftp remoteuser@xfer1.jasmin.ac.uk:/group_workspaces/jasmin/myproject/data/notes.txt ./ For more information see the Wikipedia page on SFTP.\nThere are various 3rd-party tools and clients, for example, WinSCP, FileZilla, MobaXterm and others, which can do transfers using the SCP and/or SFTP protocols. Please refer to the documentation for that particular software, but the basic principles are the same, i.e that you can set up a connection to a remote host by specifying the same parameters that you would with the command- line tool, but often through a graphical user interface instead.\nNote on performance \u0026nbsp; While convenient and familiar to many users, the tools described above do not make efficient use of available bandwidth for transferring large quantities of data via high-speed networks over long distances. Please consult Data Transfer Tools to learn more about which might be the most appropriate tool to use in different contexts."
      })
      .add(
      
      
      {
        id: 94,
        tag: "en",
        href: "/docs/software-on-jasmin/running-python-on-jasmin/",
        title: "Running python on JASMIN",
        description: "Running python on JASMIN",
        
        
        content: "On the JASMIN analysis machines and on Lotus, we currently support Python version 3.10 through Jaspy.\nWhen you log in, the default version of Python is 2.7.5 which is the used by the operating system. You shoud now use a more modern version of Python as v2.x is now deprecated. We recomment using the Jaspy environments. In this example, we activate the current Jaspy environment before running Python.\nmodule load jaspy Check the Python version:\npython -V Python 3.10.8 Run a script:\npython your_script.py If you want to use an executable script (which can be invoked just by name), then the recommended line to put at the top of the script would be:\n#!/usr/bin/env pythonafter which you should set \u0026ldquo;write\u0026rdquo; permission, and then you can run it without the \u0026ldquo;python \u0026quot; prefix:\nchmod 755 your_script.py ./your_script.py You should work with Python on the scientific analysis servers. Login servers do not have any software installed, or filesystems mounted other than home directories."
      })
      .add(
      
      
      {
        id: 95,
        tag: "en",
        href: "/docs/software-on-jasmin/running-r-on-jasmin/",
        title: "Running R on JASMIN",
        description: "Running R on JASMIN",
        
        
        content: "On the JASMIN sci servers and LOTUS, we support the use of R through the \u0026ldquo;jasr\u0026rdquo; environment(s), as listed on the Jaspy page.\nIn order to activate the R environment, you will need to use:\nmodule load jasr Note that the Jaspy page lists all available environments. You can also list the R packages that are available in the environment by typing:\nls $CONDA_PREFIX/lib/R/library/ Once you have activated the environment, you can start R, using:\nR R version 4.0.5 (2021-03-31) -- \u0026#34;Shake and Throw\u0026#34; Copyright (C) 2021 The R Foundation for Statistical Computing Platform: x86_64-conda-linux-gnu (64-bit) R is free software and comes with ABSOLUTELY NO WARRANTY. You are welcome to redistribute it under certain conditions. Type \u0026#39;license()\u0026#39; or \u0026#39;licence()\u0026#39; for distribution details. Natural language support but running in an English locale R is a collaborative project with many contributors. Type \u0026#39;contributors()\u0026#39; for more information and \u0026#39;citation()\u0026#39; on how to cite R or R packages in publications. Type \u0026#39;demo()\u0026#39; for some demos, \u0026#39;help()\u0026#39; for on-line help, or \u0026#39;help.start()\u0026#39; for an HTML browser interface to help. Type \u0026#39;q()\u0026#39; to quit R. [Previously saved workspace restored] If you have an R script that you wish to run, you can use the \u0026ldquo;Rscript\u0026rdquo; command, such as:\nRscript \u0026lt;myscript\u0026gt; The following shows the options available when using \u0026ldquo;Rscript\u0026rdquo;:\nRscript --help Usage: /path/to/Rscript [--options] [-e expr [-e expr2 ...] | file] [args] --options accepted are --help Print usage and exit --version Print version and exit --verbose Print information on progress --default-packages=list Where \u0026#39;list\u0026#39; is a comma-separated set of package names, or \u0026#39;NULL\u0026#39; or options to R, in addition to --no-echo --no-restore, such as --save Do save workspace at the end of the session --no-environ Don\u0026#39;t read the site and user environment files --no-site-file Don\u0026#39;t read the site-wide Rprofile --no-init-file Don\u0026#39;t read the user R profile --restore Do restore previously saved objects at startup --vanilla Combine --no-save, --no-restore, --no-site-file --no-init-file and --no-environ \u0026#39;file\u0026#39; may contain spaces but not shell metacharacters Expressions (one or more \u0026#39;-e \u0026lt;expr\u0026gt;\u0026#39;) may be used *instead* of \u0026#39;file\u0026#39; See also ?Rscript from within R The version number (currently 4.0.5) is reported when you start R, or if you type: R --version R version 4.0.5 (2021-03-31) -- \u0026#34;Shake and Throw\u0026#34; Copyright (C) 2021 The R Foundation for Statistical Computing Platform: x86_64-conda-linux-gnu (64-bit) R is free software and comes with ABSOLUTELY NO WARRANTY. You are welcome to redistribute it under the terms of the GNU General Public License versions 2 or 3. For more information about these matters see https://www.gnu.org/licenses/. Here are commands to do a simple plot to a file, which you can use to test running R either interactively or with \u0026ldquo;Rscript\u0026rdquo; as described above.\npng(\u0026#34;myplot.png\u0026#34;) x \u0026lt;- c(1,2,3,4) y \u0026lt;- x*x plot(x,y) dev.off()(You could use the \u0026ldquo;display\u0026rdquo; command on JASMIN to view the output file.)\nHere is a minimal example of using the \u0026ldquo;library\u0026rdquo; command to load one of the many add-on libraries that have been installed to supplement the core R distribution. It uses the \u0026ldquo;prettyunits\u0026rdquo; package to convert a number of bytes to human-readable format.\nmodule load jasr R --quiet library(prettyunits) pretty_bytes(12345678) [1] \u0026#34;12.35 MB\u0026#34; Finally, to quit R, type the following:\nq() Save workspace image? [y/n/c]: n"
      })
      .add(
      
      
      {
        id: 96,
        tag: "en",
        href: "/docs/data-transfer/scheduling-automating-transfers/",
        title: "Scheduling/Automating Transfers",
        description: "Scheduling/Automating Transfers",
        
        
        content: "This article explains how to schedule or automate data transfers. It covers:\nUsing Globus for transfer automation Scheduling download tasks using cron and LOTUS Overview \u0026nbsp; In many cases it can be useful to fetch data from an external source for processing/analysis on JASMIN on a regular basis, for example \u0026ldquo;every Monday at 11:00 fetch all last week\u0026rsquo;s data\u0026rdquo;. It can also be helpful to distribute the task downloading of some large datasets, or simply to be able rely on data being pulled in from some external source to an accumulating dataset used for periodic analysis.\nUsing Globus for transfer automation \u0026nbsp; It is easy to automate transfers using Globus. This method has the advantage that you do not need to remain connected or logged in to any JASMIN server for the automated transfers to take place on your behalf, and the transfer itself can be more efficient than other methods described below.\nSome introductory information about how to do this is available in this article Using the Globus command-line interface (with more to follow) but please also refer to the comprehensive Globus documentation and their automation examples. You can choose whether to schedule/automate tasks via the Globus web interface\u0026nbsp; , command-line interface\u0026nbsp; , or use their Globus Python SDK\u0026nbsp; to build Python code that uses this functionality.\nScheduling download tasks using cron and LOTUS \u0026nbsp; While the cron server cron.jasmin.ac.uk is provided for scheduling general tasks, it should not be used for the work of executing those tasks itself, and not for transfer tasks.\nxfer3 - transfer machine with cron \u0026nbsp; The transfer server xfer3.jasmin.ac.uk is also provided with cron, and should be used where a task is primarily a transfer rather than a processing task and needs the functionality of a transfer server. For access to xfer3 you will need the xfer-sp access role\u0026nbsp; . Please refer to the above cron guidance for best practice advice.\nInvoking LOTUS from cron to carry out multiple download tasks \u0026nbsp; Sometimes we need a task to be invoked from cron but executed where there are lots of nodes to parallelise the tasks (i.e. the LOTUS cluster). In this case, we DO need to use the cron server rather than xfer3, since we need to be able to talk to LOTUS (xfer3 can\u0026rsquo;t do that, as a transfer server).\nThis will only work where the download can happen over HTTP(S), so depends on how the remote data is made available.\nWe need it to:\ninvoke a job submission script at regular intervals have that script initiate downloads using LOTUS nodes In the examples below, we use the test queue (or partition, as queues are known in Slurm). You can use this for testing, but once you know roughly how long your download(s) should take, you should choose an appropriate queue so that the jobs can be scheduled in a fair way alongside other users\u0026rsquo; jobs.\n1. Single download script \u0026nbsp; The simple script below is used to download a single file from an external source via HTTP using wget. It initially uses the test partition (queue), but once you had tested it, you would need to use a more appropriate queue.\n#!/bin/bash #SBATCH --partition=test #SBATCH -o %j.out #SBATCH -e %j.err #SBATCH --time=00:30 # executable wget -q -O 1MB_$SLURM_JOBID.zip http://speedtest.tele2.net/1MB.zipIn this example, the file is labelled with the id of the job which downloaded it, e.g. 1MB_61117380.zip\nThe same could be also achieved using curl, or using a Python script making use of (for example) the requests library.\nA note about transfer tools: since we are delegating the actual download task to a LOTUS node, we are restricted to transfer tools already installed on those nodes or available in the user\u0026rsquo;s path at a location cross-mounted with nodes in the LOTUS cluster (see Table 1 in Access to Storage), such as $HOME or a group workspace. It is not possible for the JASMIN team to install specialist data transfer tools across the whole cluster, so you may be limited to downloading via HTTP(S), FTP, or via tools available via libraries in the Python environment such (which you do have access to and can easily customise to install additional libraries using virtual environments).\nDue to networking limitations, LOTUS nodes cannot perform downloads using SSH-based methods, i.e. scp/rsync/sftp.\nDownload tools installed on LOTUS nodes include:\nwget curl ftp (but not lftp) In our simple example above, we can subit this script to LOTUS from the command line with\nsbatch test_download.sh This could be invoked on a regular basis by adding a crontab entry like this\n30 * * * * sbatch /home/users/username/test_download.shHowever it would be safer to wrap this in a crontamer command like this to ensure one instance of the task had finished before the next started: (see Using cron for details)\n30 * * * * crontamer -t 2h \u0026#39;sbatch /home/users/username/test_download.sh\u0026#39; 2. Multi-node downloads \u0026nbsp; We could expand this example to download multiple items, perhaps 1 directory of data for each day of a month, and have 1 element of a job array handle the downloading of each day\u0026rsquo;s data.\nA few words of warning: Distributing download tasks as shown below can cause unintended side-effects. Here, we\u0026rsquo;re submitting an array of 10 download jobs, each initiating a request for a 1MB file which may well happen simultaneously. So we need to be confident that the systems and networks at either end can cope with that. It would be all too easy to submit a task to download several thousand large data files and cause problems for other users of JASMIN (and other users on its host institution\u0026rsquo;s network), or indeed at the other end. Taken to the extreme, this could appear over the network as a Distributed Denial-of-Service (DDoS) attack. As with all LOTUS tasks: start small, test, and increase to sensible scales when you are confident it will not cause a problem. A limit of 10 jobs would be a sensible maximum, for one user.\nWe\u0026rsquo;ll simulate this here by downloading the same external file to 10 different output files, but you could adapt this concept for your own purposes depending on the layout of the source and destination data.\n#!/bin/bash #SBATCH --partition=test #SBATCH -o %A_%a.out #SBATCH -e %A_%a.err #SBATCH --time=00:30 #SBATCH --array=1-10 #SBATCH --time=00:30 # executable wget -q -O 1MB_$SLURM_ARRAY_TASK_ID.zip http://speedtest.tele2.net/1MB.zip echo \u0026#34;script completed\u0026#34;In this (perhaps contrived) example, we\u0026rsquo;re setting up an array of 10 elements and using the SLURM_ARRAY_TASK_ID environment variable to name the output files (otherwise they\u0026rsquo;d all be the same). In a real-world example you could apply your own logic to divide up files or directories matching certain patterns to become elements of a job array.\nThe script could then be scheduled to be invoked at regular intervals as shown in (1).\nSome tools provide functionality for mirroring or synchronising directories, i.e. only downloading those files in a directory which are new have been added since the last time a task was run. These can be useful to avoid repeated downloads of the same data."
      })
      .add(
      
      
      {
        id: 97,
        tag: "en",
        href: "/docs/interactive-computing/sci-servers/",
        title: "Scientific analysis servers",
        description: "Scientific analysis servers",
        
        
        content: "Intro \u0026nbsp; Once you have logged on to one of the login servers you can then ssh to a scientific analysis (sci) server to do your work. The sci servers are not directly accessible outside the firewall of RAL (JASMIN\u0026rsquo;s host instution) so most users will need to access them via a login server.\nAvailable sci servers \u0026nbsp; The following sci servers are available:\nServer name Virtual/Physical (OperatingSystem) Processor model CPU Cores RAM (GB) /tmp (GB) sci1.jasmin.ac.uk V (CentOS7) Xeon(R) Silver 4114 CPU @ 2.20GHz 8 32 N/A [Note 2.] sci2.jasmin.ac.uk V (CentOS7) Xeon(R) E5-2630 @ 2.20GHz 8 32 [Note 2.] sci3.jasmin.ac.uk P (CentOS7) [Note 1.] AMD EPYC 7402 48 1000 25 sci4.jasmin.ac.uk V (CentOS7) Xeon E5-2660 @ 2.20GHz 8 32 N/A [Note 2.] sci5.jasmin.ac.uk V (CentOS7) Intel(R) Xeon(R) CPU E5-2630 v4 @2.20GHz 8 32 N/A [Note 2.] sci6.jasmin.ac.uk P (CentOS7), [Note 1.] AMD EPYC 7402 48 1000 25 sci8.jasmin.ac.uk P (CentOS7), [Note 1.] Intel(R) Xeon(R) Gold 5118CPU @ 2.30GHz 24 383 25 Notes \u0026nbsp; 1. Physical servers \u0026nbsp; Hosts sci[3,6,8].jasmin.ac.uk are physical servers on a private internal network, so outbound internet access (via NAT) is only for HTTP(S), so outbound SSH will not work (to hosts outside of JASMIN) on these machines. If you try to git pull/clone from external repositories e.g. Github, the operation will timeout with error fatal: Could not read from remote repository. The solution in this case is to access git pull/clone over HTTPS instead (check the repo for alternative access details).\n2. /tmp on VMs \u0026nbsp; The local /tmp of the virtual sci servers is not available (N/A) for users as this is used by the VM itself. It also provides no performance advantage as it is not local to the server.\n3. Arbiter \u0026nbsp; A monitoring utility \u0026ldquo;Arbiter\u0026rdquo; is implemented across all sci machines to control CPU and memory usage. This utility records the activity on the node, automatically sets limits on the resources available to each user. Users\u0026rsquo; processes are thus capped from using excessive resources, and can be slowed or have memory reduced in response to repeated violations.\n4. Privileges \u0026nbsp; Users are not permitted to execute commands which require administrative privileges. This applies to all hosts in the managed part of JASMIN where users have SSH login access (for example login, nx-login, sci, xfer and hpxfer machines). In other words, the use of su or sudo is not permitted. Please be careful when typing commands, particularly if you have multiple terminal windows open on your own computer, that you do not accidentally attempt sudo on a JASMIN machine: expect some follow-up from the JASMIN team if you do!\nSee also Software installed, below.\nPurpose \u0026nbsp; Scientific analysis servers are designed for interactive and ad-hoc analysis of data in group workspaces, the CEDA archive, and users\u0026rsquo; home directories. For long-running and resource-intensive jobs, users are required to use the LOTUS cluster which offers better I/O performance, parallelism, and fair-share scheduling.\nThe following guidelines should be considered when using the scientific analysis servers:\nCheck available resources before your process starts and choose a sci server that is suitable (check average load in the list displayed at the login screen on the login servers, or by using the Linux monitoring commands: top, or free -h ) Execution/processing time should be less than 1 hour Serial jobs only High memory jobs should be executed on the physical servers which have more memory (labelled P in above table). Monitor your process on a sci server using top or ps Linux commands Report if there is a user\u0026rsquo;s process affecting the performance of a scientific server Software installed \u0026nbsp; Each sci server has the following features:\nCentOS7 operating system with development tools. [NB: Rocky9 from summer 2024] Software packages that make up the JASMIN Analysis Platform are all installed - providing commonly-used open-source analysis tools. These packages include NCO, CDO, Python (with netCDF4, matplotlib, numpy etc.,) and R. Access to proprietary tools, e.g. IDL and Intel Fortran, through the module system. Ability to run graphical applications: use the NX graphical desktop service for best performance. Further information on using the software provided on JASMIN can be found here.\nSee [Note 4] above about privileges: you can only install software for yourself if it can be done with user-level privileges.\nAccess to storage \u0026nbsp; Each sci server has:\nAccess to the LOTUS /work/scratch-pw* and /work/scratch-nopw2 volumes. Read access to the CEDA Archive according to permissions on your CEDA account. Read/Write access to Group Workspaces according to membership."
      })
      .add(
      
      
      {
        id: 98,
        tag: "en",
        href: "/docs/short-term-project-storage/secondary-copy-using-elastic-tape/",
        title: "Secondary copy using Elastic Tape",
        description: "Secondary copy using Elastic Tape",
        
        
        content: "\u0026nbsp; Information below relates to the Elastic Tape command-line tools. The JDMA system provides a better interface for putting/retrieving data into the Elastic Tape System) A new system called NLDS is coming very shortly (as of Feb 2023) and will eventually replace both of these. Introduction \u0026nbsp; Elastic Tape is a system developed for use with JASMIN Group Workspaces (GWSs), enabling the Group Workspace Manager to:\nOptimise their use of high-performance online disk by moving data to and from cheaper near-line storage Create and manage secondary copies of GWS data At present, the system is designed only to be used by GWS Managers, rather than individual members of a GWS. It is the responsibility of a GWS Manager to create and manage backups or additional copies of data in a GWS.\nThe servers used to access Elastic Tape changed in January 2021. Previous users should note that the server to use now is et.jasmin.ac.uk.\nThe maximum size for any file put into Elastic Tape is 500GB. This changed in 2023, when the underlying tape system was upgraded. Please limit your files to less than 500GB.\nWho can use ET? \u0026nbsp; ET is only for use by the named GWS manager, i.e. the individual responsible for managing the GWS disk space. The high-performance disk space used for a GWS is a valuable commodity and the role of the GWS Manager involves making best use of the online space. This may mean moving data to tape to free up space online, or taking a copy of online data to make a secondary copy. No undertaking is provided that the secondary copy will exist beyond the lifetime of the Group Workspace itself, hence it is called a secondary copy and not a backup. It is also NOT long-term archive storage: some data in GWSs may need to be earmarked for longer-term archive storage and wider availability via the CEDA Archive, but this is a separate process for which data management plans, ingest processes and metadata need to be put in place. Please contact the helpdesk if this is the case, but ideally this needs to be considered at project design phase (as it may need funding!).\nEach GWS has a quota of online disk space (agreed at the time of its creation) and initially the ET quota has been set to the same value. So if you have a 10 Tb workspace, you initially have a 10Tb quota of ET storage to match.\nHow does it work? \u0026nbsp; Putting data into ET storage involves creating a \u0026ldquo;batch\u0026rdquo; of data which is transferred to the ET system. Using either a file list or top-level directory for reference, the system calculates resources needed and creates a batch, identified by a batch ID. This must be retained by the GWS manager as a \u0026ldquo;ticket\u0026rdquo; for later retrieval of this batch of data. It is recommended that you assess the data that you plan to transfer so that you have an idea of the overall volume to be transferred before initiating any actual transfer jobs. It is also recommended to test operation with a small set of test data.\nTransparent to the user, and asynchronously (so it is not necessary to wait with a terminal window open), the data are transferred first to online cache and then to tape storage. It is not an instant process and the task of migrating data from online cache to tape can take several hours, even days, depending on factors such as the size of the transfer, contention for the tape system and network conditions. An RSS feed and a web page provide updates on the process of data transfer for each batch. Data can later be retrieved, or removed from ET storage via similar tools.\nThe transfer of data via a batch involves the \u0026ldquo;registration\u0026rdquo; of each file in a database so that its existence is recorded.\nCommand line tools are provided on a dedicated machine within the JASMIN infrastructure, to which GWS managers will be given access. A GWS manager has access to the python tools et_put.py, et_get.py, et_rm.py and et_ls.py. Some initial documentation for these command line tools is attached.\nWhat should I do next? \u0026nbsp; It is recommended to try sending and retrieving some small data transfers (a few Gb) at first using the documentation below, but the system has been designed to cope with storing entire GWSs. You will need ssh login access to et.jasmin.ac.uk first. This should have been arranged for you as part of the GWS setup process. If not, please contact the JASMIN helpdesk. Once there, you should be able to see your group workspace and try out the commands on a small set of test data.\nSystem overview \u0026nbsp; Elastic Tape provides the ability to create \u0026ldquo;batches\u0026rdquo; of files which are then sent to the storage system, initially to an online disk cache before being written to near-line tape. Batches can later be retrieved, or removed. An alert system provides the user with the ability to monitor the progress of transfer jobs.\nThe system comprises:\nA command-line interface on a client machine A backend system, consisting of I/O servers connected to an online disk cache and database A near-line tape system Configuration file \u0026nbsp; As a GWS manager, you will normally be responsible for one or more GWSs. The GWS with which you wish to work using ET needs to be specified either in a configuration file in your home directory, or by specifying the workspace as an option in the command line interface.\nCertain default settings are set in a system-wide config file at /etc/et_config.\nIf needed, you need to create a small text file in your home directory named .et_config, which contains the following, replacing \u0026ldquo;myworkspace\u0026rdquo; with the name of your default workspace:\n[Batch] Workspace = myworkspacemyworkspace should just be the short name of the workspace, not the full path to it.\nThe workspace specified in any command-line option overrides that specified in the user\u0026rsquo;s (~/.et_config) config file, which in turn overrides that specified in the system (/etc/et_config) config file.\nPlease REMOVE any previous reference to host and port from your individual ~/.et_config file. This setting is now set from the system /etc/et_config file.\nFurther configuration options are available in the [DIRECTORY] section of the file, see the system-wide file /etc/et_config for examples. The main parameter for which you may wish to override the default is:\noutputLevel = workspace|batch|filealthough these can be over-ridden at the command line anyway. See et_ls.py command documentation below for the meaning of these options.\nUser interface \u0026nbsp; Please note that NOT ALL features of the currently-implemented user interface are described here, however we would recommend that users limit their usage to those features described below.\nThe user interface consists of the following components:\net_put.py Put data onto tape et_get.py Retrieve data from tape et_rm.py Remove data from tape et_ls.py List data holdings on tape Alerts Get information about processes and holdings via web interface The commands are available on host et.jasmin.ac.uk. As a GWS manager you should have been granted login access to this machine using your JASMIN account, however if accessing the host from outside the RAL network you will need to use the login gateways login1.jasmin.ac.uk, login2.jasmin.ac.uk, login3.jasmin.ac.uk or login4.jasmin.ac.uk. Use the -A option or equivalent for agent forwarding in ssh. STFC users may use the STFC VPN to connect to et.jasmin.ac.uk as if it were a local connection.\n\u0026nbsp; When writing data to the ET system, it is very important that data remains in place on disk, in the location where ET expects to find them, until the status of the batch in question has reached CACHED_SYNCED or SYNCED. This means that the data have actually been written to tape, but is not the case until that status is shown.\nThe location where ET expects to find the files will be specified in the LISTFILE that the user supplied to the et_put.py command, or all files and directories under the DIR. The status of user\u0026rsquo;s batches can be checked by going to the webpage: http://et-monitor.fds.rl.ac.uk/et_user/ET_AlertWatch.php. You need to be logged into JASMIN to see this webpage, via the nx-login servers, and use Firefox as the web browser.\nDeleting the data from disk prematurely can cause problems for the ET system as a whole (impacting other users) so please be careful with this aspect.\net_put.py \u0026nbsp; Put data onto tape.\nSynopsis \u0026nbsp; et_put.py [-v] [-l LOGFILE] [-w WORKSPACE] [-c] [-t one-word-tag] [ -f LISTFILE | DIR ] Description \u0026nbsp; Data files to be stored can be specified either in an input list file (-f) or by specifying the path to the top of a directory tree containing files to be stored. All symbolic links are ignored (see note below). In both cases, the system will analyse the request and create a batch , identified by a BATCH ID, which can later be used to retrieve that set of files from storage. Although the main \u0026ldquo;put\u0026rdquo; operation is asynchronous (and does not require you to maintain a terminal connection for its duration), the initial registration step, which creates the BATCH ID is synchronous, so you should wait for this step to complete before disconnecting.\nGiven current resources, all users of Elastic Tape share the current throughput capacity of about 25 TB/day, which may increase over time. Please consider this when organising your input batches and expectations of completion time. Large numbers of small files will degrade performance.\nOptions \u0026nbsp; option details -v Verbose output -l LOGFILE Log file in which to record process output -f LISTFILE Text file containing ABSOLUTE paths of files to be stored, 1 file per line. NB Files and directory names are case-sensitive. The list should not contain any blank lines or extraneous white space. -w WORKSPACE Name of the group workspace to use. Overrides default set in config file. Case sensitive. DIR ABSOLUTE path to top of directory tree containing files to be stored -c Continue if errors encountered. -t tag Tag batch with descriptive label meaningful to user. Should be single one-word string. Appears as \u0026ldquo;Batch name\u0026rdquo; in ET alert output and \u0026ldquo;Tag\u0026rdquo; in et_ls output. Example usage \u0026nbsp; Simple case, using a file input.list which contains paths of all the files to be included in the batch:\net_put.py -v -l et_put.log -f input.list -w myworkspace In the following example, the -coption is used to continue on errors. One error that may be encountered is that a file already exists in the system (e.g. has already been \u0026ldquo;put\u0026rdquo;). This option causes the system to ignore any errors and continue with the transfer. Note that this should not be used by default (we would rather know about errors and fix them!)\net_put.py -v -l et_put.log -f input.list -w myworkspace -c Alternative usage specifying a directory beneath which all files / directories will be included. In this case the directory must be the last parameter in the command:\net_put.py -v -l et_put.log -w myworkspace /group_workspaces/jasmin/myworkspace/mydir Symbolic links: Attempting to include symbolic links in an et_put operation should cause an error. You can override this with the -c option (although this will ignore ALL errors), but a better solution is to generate a list file as in the first two examples above. If this list file is generated with a command like find \u0026lt;path\u0026gt; -type f \u0026gt; listfile.txt, then referring to it in the et_put command will ensure that only those files are included in the batch. You can then keep the list file (perhaps named as per the resulting batch ID for your own records.\net_get.py \u0026nbsp; Retrieve data from tape\nSynopsis \u0026nbsp; et_get.py [-v] [-l LOGFILE] [-b BATCHID | -f FILELIST] [-w WORKSPACE] [-r DIR] [-t MAXPROC] Description \u0026nbsp; Data files to be retrieved should be specified by referring to the batch ID of the batch in which they were stored. If files have been stored by specifying an absolute path e.g. /group_workspaces/jasmin/myworkspace/mydir, the retrieval process will not write the retrieved files to the same location but a new location specified by DIR. The final part of the relative path needs to correspond with the first part of the absolute path of the stored files, e.g. group_workspaces\nProposed best-practice is to create a temporary directory for retrieved data within your workspace, e.g. /group_workspaces/jasmin/myworkspace/ettmp and to do the initial retrieval into that directory. Once you are satisfied that the retrieval has completed correctly, data can be moved back to their original location in the workspace. NB if you need additional storage space for this, please contact the CEDA help desk.\nOptions \u0026nbsp; option details -v Verbose output -l LOGFILE Log file in which to record process output. Note that the log file location must be capable of accepting multi-threaded input, or this parameter should be omitted and instead the output from the et_get command be piped to the log file from stdout -b BATCHID ID of batch to be retrieved -f FILELIST A list of individual files to be retrieved, with one file per line. Note that:\n- entries in the list must contain the full name of the file, including path, just as it was archived\n- the list should not contain blank lines or any extraneous white space. -w WORKSPACE name of the group workspace to use. Overrides default set in config file. Case sensitive. -r DIR ABSOLUTE path of retrieval location -t MAXPROC Maximum number of worker processes to use in retrieval. MAXPROC recommended to be between 5 and 10. Please feed back your experience of performance improvement with this feature. Example usage \u0026nbsp; cd /group_workspaces/jasmin/myworkspace mkdir ettmp et_get.py -v -l et_get.log -w myworkspace -b 507 -r /group_workspaces/jasmin/myworkspace/ettmp At this point, data will be transferred into the specified retrieval directory. Files and directories will be restored with their ABSOLUTE path below the retrieval directory. NB this is a synchronous process and you will need to keep your terminal window open to ensure it completes (or run within the screen command if you are familiar with this).\nWhen the retrieval process has finished, you should satisfy yourself that it is correct (using your preferred method). When this is the case, you can move the data to the required location as shown below:\nmv /group_workspaces/jasmin/myworkspace/ettmp/group_workspaces/jasmin/myworkspace/* /group_workspaces/jasmin/myworkspace et_rm.py \u0026nbsp; Remove data from tape\nSynopsis \u0026nbsp; et_rm.py [-v] -b BATCHID [-w WORKSPACE] Description \u0026nbsp; Deletes the files in the specified batch from the Elastic Tape system.\nOptions \u0026nbsp; option details -v Verbose output -b BATCHID ID of batch to be removed -w WORKSPACE name of the group workspace to use. Overrides default set in config file. Case sensitive. Example usage:\net_rm.py -v -b 507 et_ls.py \u0026nbsp; List holdings on tape\nSynopsis \u0026nbsp; et_ls.py [-h] [-X XMLSOURCE] [-H] [-b BATCHID] [-w WORKSPACE] [-L file,batch,workspace] [-F text] Description \u0026nbsp; Lists the holdings of a workspace within Elastic Tape at the file, batch or workspace level.\nOptions \u0026nbsp; option details -h, \u0026ndash;help show this help message and exit -x XMLSOURCE \u0026ndash;xmlsource XMLSOURCE Base XML source, if not default. Note that this has to be compatible with the current base source currently, so can’t be pointed at files, for example -H \u0026ndash;headerWanted Print headers showing column names for text output -b BATCHID \u0026ndash;batchid BATCHID ID of batch by which to filter results -w WORKSPACE Name of the group workspace to use. Overrides default set in config file. Case sensitive. -L file, batch, workspace \u0026ndash;outputLevel file, batch, workspace Level of detail to display for results (default is \u0026ldquo;workspace\u0026rdquo;) -F text \u0026ndash;outputFormat text Format to use for the display of results Example usage:\net_ls.py -w myworkspace -H -L file -b 504 Works with the workspace \u0026ldquo;myworkspace\u0026rdquo;, selects display of headers in output, results at file level, filter by batchid 504 (i.e. shows the files present in ET in the given batch.)\net_ls.py -w myworkspace -H -L batch Works with the workspace \u0026ldquo;myworkspace\u0026rdquo;, selects display of headers in output, results at batch level (i.e. shows the batches present in ET holdings for this workspace.)\nAlerts \u0026nbsp; The system provides real-time status messages on the progress of operations requested. These services are now available only inside the RAL firewall , so JASMIN users outside of RAL should use the NX graphical desktop service to open a firefox browser on one of the nx-login servers, to access these URLs\nAlerts Dashboard http://et-monitor.fds.rl.ac.uk/et_user/ET_AlertWatch.php\nRSS Feed http://et-monitor.fds.rl.ac.uk/et_rss/ET_RSS_AlertWatch_atom.php\nIn both cases these can be customised to display only alerts from the workspace of interest to the GWS manager.\nAlerts Dashboard http://et-monitor.fds.rl.ac.uk/et_user/ET_AlertWatch.php?workspace=WORKSPACE\nRSS Feed http://et-monitor.fds.rl.ac.uk/et_rss/ET_RSS_AlertWatch_atom.php?workspace=WORKSPACE\n(replace WORKSPACE with your workspace name in the above URLs)\nFurther views\nET Home http://et-monitor.fds.rl.ac.uk/et_user/ET_Home.php?caller=USERNAME\nHoldings summaryhttp://et-monitor.fds.rl.ac.uk/et_user/ET_Holdings_Summary.php?caller=USERNAME\u0026amp;workspace=WORKSPACE\n(replace USERNAME with your username, WORKSPACE with your workspace name in the above URLs)"
      })
      .add(
      
      
      {
        id: 99,
        tag: "en",
        href: "/docs/mass/setting-up-your-jasmin-account-for-access-to-mass/",
        title: "Setting up your JASMIN account for access to MASS",
        description: "Setting up your JASMIN account for access to MASS",
        
        
        content: "The following notes are written assuming you are using a Linux machine in your home institution, that you have applied for a new MASS account, and that you have received an email from the Met Office Storage Team with your new MASS credentials file attached.\nLoad your SSH key \u0026nbsp; Start an ssh-agent on your home institution machine, load your private key, and enter your passphrase when requested.\neval $(ssh-agent -s) ssh-add ~/.ssh/id_rsa_jasmin Enter passphrase for ~/.ssh/id_rsa_jasmin: Note: it\u0026rsquo;s a good idea to keep your private keys for different systems separated, so you may want to keep your private key for JASMIN in a separate file, just move the one created during the process described above to a new sensible location such as ~/.ssh/jasmin_id_rsa.\nTest login to the JASMIN login node \u0026nbsp; Note: that the -A in the first ssh command is mandatory to enable access to the client VM, the -X enables X11 forwarding and is optional.\nssh -A -X \u0026lt;userid\u0026gt;@login1.jasmin.ac.uk 3. Test login to the MASS client host \u0026nbsp; From the login machine, you can then login to the MASS client host.\nNote: If it does not let you log in even when you have agent forwarding correctly set up and can log into the \u0026ldquo;sci\u0026rdquo; nodes, then you have either not requested additional access to the dedicated client machine, or access hasn\u0026rsquo;t been approved yet, email the Met Office Service Manager monsoon@metoffice.gov.uk, to verify that approval has been granted. Allow a couple of days for this process to happen after submitting your request for access to the VM.\nssh -X \u0026lt;userid\u0026gt;@mass-cli.jasmin.ac.uk echo \u0026#34;Hello World\u0026#34; Hello World exit exit # back on your local machine Install your MOOSE credentials file \u0026nbsp; You can scp the file via a JASMIN transfer server, make sure the credentials file is called moose, and you must run the moo install command on mass- cli.jasmin.ac.uk to set it up for you.\n\u0026nbsp; The external moose client has improved security settings, so you must use the moo install command to put your moose credentials file in the correct place in order to get remote access to work. This can only be done on the client machine mass-cli.jasmin.ac.uk. The credentials file is also changed by the running of moo install, so this process can be run only once. scp moose \u0026lt;userid\u0026gt;@xfer1.jasmin.ac.uk:~/moose ssh -A -X \u0026lt;userid\u0026gt;@login1.jasmin.ac.uk ssh -X \u0026lt;userid\u0026gt;@mass-cli.jasmin.ac.uk ls -l ~/moose -rwx------ 1 \u0026lt;userid\u0026gt; users 511 Jul 3 13:45 /home/users/\u0026lt;userid\u0026gt;/moose moo install ### passwd, command-id=148593088 Your password is due to expire in -1 day(s). A new password can be generated using \u0026#39;moo passwd -r\u0026#39;. ls -l ~/.moosedir/moose -rw------- 1 \u0026lt;userid\u0026gt; users 511 Jul 3 13:45 /home/users/\u0026lt;userid\u0026gt;/.moosedir/moose Having run these commands on the client machine, the moose file will have disappeared from your home directory, but a .moosedir directory will have been created, this will contain a new moose file, an install.log file, and once you start making MOOSE queries, a moose-external-client.log will be created.\nTest use of the locally installed MOOSE client \u0026nbsp; which moo /opt/moose/external-client-version-wrapper/bin/moo moo si \u0026lt;system information appears here\u0026gt; moo help \u0026lt;help details appear here\u0026gt; moo projlist \u0026lt;list of projects appears here\u0026gt; You have now successfully accessed MASS from JASMIN!\nIf you are new to MOOSE, you might like to read the User Guide next."
      })
      .add(
      
      
      {
        id: 100,
        tag: "en",
        href: "/docs/short-term-project-storage/share-gws-data-on-jasmin/",
        title: "Sharing GWS data on JASMIN",
        description: "Sharing GWS data with other users elsewhere on JASMIN",
        
        
        content: "Introduction \u0026nbsp; This article explains how a GWS Manager can organise for some directories within a GWS to be shared with other users on JASMIN.\nNote: this only applies to sharing data within the managed environment of the JASMIN platform. If you need to share data with users outside JASMIN, or to users of external cloud tenancies, please consider the HTTP option.\nHow to share specific directories \u0026nbsp; Sometimes it is useful to share the contents of specific directories within your GWS with other users on JASMIN (that do not have access to your GWS). This can be achieved with the following approach:\nSuppose you manage the GWS /group_workspaces/jasmin/superproj and you want to share the directory /group_workspaces/jasmin/superproj/mydata with other JASMIN users.\n1. Add read and execute permission for all to the top-level GWS directory. This requires root access so you might need to request that CEDA make this change for you:\nchmod 775 /group_workspaces/jasmin/superproj 2. Alter the permissions of all sub-directories to remove the execute permission for all users that don\u0026rsquo;t have access to the GWS:\nfind /group_workspaces/jasmin/superproj -type d -exec chmod o-x  \\; 3. Add execute permission on the sub-directory you want to share:\nchmod o+x /group_workspaces/jasmin/superproj/mydata NOTE: You may need to change permissions on directories and files within the sub-directory as well. Please consult the chmod man pages (by typing man chmod) for details.\nNOTE: if you have a public directory then it needs 755 access if you want it to be visible via the webserver on the gws-access.jasmin.ac.uk server. So you may wish to re-add execute permission on that directory, e.g.:\nchmod o+x /group_workspaces/jasmin/superproj/public \u0026nbsp; Do not set open permissions on files or directories. By this we mean permissions where data are \u0026ldquo;world-writable\u0026rdquo; by anyone, for example\n-rw-rw-rw- for a file, or \u0026laquo; DON\u0026rsquo;T USE THESE!!\ndrwxrwxrwx for a directory. \u0026laquo; DON\u0026rsquo;T USE THESE!!\nWe provide a UNIX a group corresponding to each group workspace, usually named gws_\u0026lt;name\u0026gt; which all members of that GWS belong to: this enables sharing within the group if you set permissions appropriately using that group. If you are unsure about setting permissions, please ask the helpdesk."
      })
      .add(
      
      
      {
        id: 101,
        tag: "en",
        href: "/docs/short-term-project-storage/share-gws-data-via-http/",
        title: "Sharing GWS data via HTTP",
        description: "Sharing GWS data via HTTP",
        
        
        content: "What is HTTP data sharing? \u0026nbsp; Specific parts of JASMIN Group Workspaces (GWSs) can be made available via HTTP, so that:\ndata can be shared with users who do not have JASMIN accounts common clients such as wget, curl, client libraries and web browsers can be used to access the data via a commonly-supported protocol. In this respect, the service should be regarded as another data transfer tool. However it must be arranged in advance between the Group Workspace manager and the JASMIN Helpdesk. It involves:\nA member of the workspace creating a public directory and placing data inside it The GWS manager making a request to the JASMIN Helpdesk to request that this specific GWS is configured to be shared via HTTP. Both these steps need to be completed in order for the GWS to be visible via HTTP. By default, GWSs are not visible by HTTP.\nOnce a GWS has been made available, it is publicly visible by the entire internet: please bear that in mind.\nThe following sections below describe how to set up restricted and unrestricted access to your \u0026ldquo;public\u0026rdquo; directory. If you require access control then see the section on password-protected access below. [Note: this is currently possible, though not recommended, only because the current webserver configuration permits this (now deprecated) means of restricting access. Future revisions of the service may remove or change the way access restrictions can be imposed].\n\u0026nbsp; This facility is not to be used for hosting project websites. It is provided as a simple means for specific data files to be made available to a wider audience than members of a Group Workspace, using a convenient data transfer protocol (HTTP). Likewise, it is not recommended to build tools or front-end applications relying on this service as a dependency if they are to be operated as a production or (near-)real-time service. The JASMIN team reserves the right to apply rate-limiting (by project and/or IP address) or to remove GWSs from the service if they are considered to be causing problems for the network or other parts of the service infrastructure.\nProjects considering web-based solutions for showcasing or disseminating their data via more complex tools or with specific availability requirements should consider requesting an external tenancy in the JASMIN Community Cloud, or indeed external service providers if more appropriate, but should be prepared to do the necessary design, development, operation and maintenance of those services themselves.\nPublic access set up \u0026nbsp; In some cases the GWS manager may want to make some files and directories available over HTTP so that users (perhaps a wider audience than just the membership of the GWS) can access the data via a web browser or other HTTP- based tools. This can be done by creating a public directory in the top- level directory of the GWS, for example:\ncd /group_workspace/jasmin/foobaa/ mkdir public chmod -Rf 755 public You should then contact JASMIN Support and ask for this directory to be made visible via the gws-access server. The JASMIN team will configure this change and your public directory will then be visible from:\nhttps://gws-access.jasmin.ac.uk/public/foobaa/\n\u0026nbsp; The URL of this service changed in June 2020. A redirect is in place from the old URL of https://gws-access.ceda.ac.uk/, so the change should be transparent to existing users, but please use the new URLs beginning with https://gws-access.jasmin.ac.uk/ to avoid any problems for example with HTTP clients that are unable to handle redirects. Please see the section below if you wish to control who can access the content of one or more of the sub-directories within your public directory.\nRestricted access set up \u0026nbsp; In order to restrict access to your \u0026ldquo;public\u0026rdquo; directory, and/or any sub- directories, you will need to create an \u0026ldquo;.htaccess\u0026rdquo; file within it. In turn, the \u0026ldquo;.htaccess\u0026rdquo; file must point to a \u0026ldquo;.htpasswd\u0026rdquo; file which lists the usernames and encrypted passwords that have read-access to that directory.\n\u0026nbsp; This method of access control is entirely independent of the SSH login accounts used on JASMIN and would be the responsibility of the GWS Manager to maintain. It is not secure by modern standards and not particularly recommended as it adds complication for GWS managers and users, but is an option for some basic access control if no other options are available.\nFuture revisions of the service may revise or remove this feature.\nIn order to create the \u0026ldquo;.htpasswd\u0026rdquo; file, you will need access to the \u0026ldquo;htpasswd\u0026rdquo; command. This is available on the transfer servers xfer[12].jasmin.ac.uk\nYou can then create the \u0026ldquo;.htpasswd\u0026rdquo; file as follows (using the example of a Group Workspace called \u0026ldquo;foobaa\u0026rdquo;):\nexport GWS=/group_workspaces/jasmin/foobaa/ cd $GWS mkdir -p public cd public htpasswd -b -m -c $GWS/public/.htpasswd i_am_a_user i_am_a_password Before this will work, you also need to create a \u0026ldquo;.htaccess\u0026rdquo; file which you could do as follows\ncat \u0026gt;.htaccess \u0026lt;\u0026lt;EOL AuthType Basic AuthName \u0026#34;Password Required\u0026#34; AuthUserFile /group_workspaces/jasmin/foobaa/public/.htpasswd Require valid-user EOL Finally, change the permissions on these files:\nchmod 644 .htaccess .htpasswd Now, you can test that you get prompted for the username and password by visiting\nhttps://gws-access.jasmin.ac.uk/public/foobaa/"
      })
      .add(
      
      
      {
        id: 102,
        tag: "en",
        href: "/docs/software-on-jasmin/share-software-envs/",
        title: "Sharing software environments",
        description: "Sharing software environments",
        
        
        content: "This article explains how you can share software environments with other users on JASMIN.\nWhat is a software environment? \u0026nbsp; A software environment is typically a collection of files and directories associated with a set of environment variables that allows a given session to access them. In the context of JASMIN, there are a number of Python/other environments already available on the system. See the Jaspy page for examples of these.\nCreating software environments on JASMIN \u0026nbsp; In some cases, JASMIN users will need to create their own software environments because the existing environments do not include all the packages that they require. See the virtual environments page for details on creating your own Python environments.\nTips on sharing software environments on JASMIN \u0026nbsp; If you need to create your own environment it is important to be aware of which file system you are working on:\nSOF (e.g. /gws/nopw/j04/*): does not perform well with small files. SSD (e.g. $HOME and /gws/smf/j04/*): performs much better with small files, but is expensive so only limited quotas are available. If you are building an environment for your use only then it makes sense to create it under your $HOME directory.\nIf you need to share an environment with other JASMIN users you can:\nRequest a \u0026ldquo;small files\u0026rdquo; (smf) Group Workspace volume. Install the software environment within the \u0026ldquo;small files\u0026rdquo; volume. Then all users with access to that GWS will be able to access the environment."
      })
      .add(
      
      
      {
        id: 103,
        tag: "en",
        href: "/docs/batch-computing/slurm-queues/",
        title: "Slurm queues",
        description: "Slurm queues",
        
        
        content: "This article introduces the Slurm scheduler queues/partitions for batch job submissions to the LOTUS and ORCHID clusters.\nQueue names \u0026nbsp; The Slurm queues in the LOTUS cluster are:\ntest short-serial long-serial par-single par-multi high-mem short-serial-4hr Each queue is has attributes of run-length limits (e.g. short, long) and resources. A full breakdown of each queue and its associated resources is shown below in Table 1.\nQueue details \u0026nbsp; Queues represent a set of pending jobs, lined up in a defined order, and waiting for their opportunity to use resources. The queue is specified in the job script file using Slurm scheduler directive like this:\n#SBATCH -p \u0026lt;partition=queue_name\u0026gt;`where \u0026lt;queue_name\u0026gt; is the name of the queue/partition (Table 1. column 1)\nTable 1 summarises important specifications for each queue such as run time limits and the number of CPU core limits. If the queue is not specified, Slurm will schedule the job to the queue short-serial by default.\nTable 1. LOTUS/Slurm queues and their specifications\nQueue name Max run time Default run time Max CPU cores per job MaxCpuPerUserLimit Priority test 4 hrs 1hr 8 8 30 short-serial 24 hrs 1hr 1 2000 30 par-single 48 hrs 1hr 16 300 25 par-multi 48 hrs 1hr 256 300 20 long-serial 168 hrs 1hr 1 300 10 high-mem 48 hrs 1hr 1 75 30 short-serial-4hr\n(Note 3) 4 hrs 1hr 1 1000 30 Note 1 : Resources requested by a job must be within the resource allocation limits of the selected queue.\nNote 2: The default value for --time=[hh:mm:ss] (predicted maximum wall time) is 1 hour for the all queues. If you do not specify this option and/or your job exceeds the default maximum run time limit then it will be terminated by the Slurm scheduler.\nNote 3 : A user must specify the Slurm job account --account=short4hr when submitting a batch job to the short-serial-4hr queue.\nState of queues \u0026nbsp; The Slurm command sinfo reports the state of queues and nodes managed by Slurm. It has a wide variety of filtering, sorting, and formatting options.\nsinfo PARTITION AVAIL TIMELIMIT NODES STATE NODELIST test up 4:00:00 48 idle host[146-193] short-serial* up 1-00:00:00 48 idle host[146-193] long-serial up 7-00:00:00 48 idle host[146-193] par-single up 2-00:00:00 48 idle host[146-193] par-multi up 2-00:00:00 48 idle host[146-193] high-mem up 2-00:00:00 48 idle host[146-193] lotus_gpu up 7-00:00:00 48 idle host[146-193] copy up 7-00:00:00 48 idle host[146-193] cpom-comet up 7-00:00:00 48 idle host[146-193] ... \u0026nbsp; Queues other than the standard queues test , short-serial , long-serial, par-single, par-multi and high-mem should be ignored as they implement different job scheduling and control policies. \u0026lsquo;sinfo\u0026rsquo; Output field description: \u0026nbsp; By default, the Slurm command \u0026lsquo;sinfo\u0026rsquo; displays the following information:\nPARTITION : Partition name followed by * for the default queue/partition AVAIL : State/availability of a queue/partition. Partition state: up or down. TIMELIMIT : The maximum run time limit per job in each queue/partition is shown in TIMELIMIT in days- hours:minutes :seconds . e.g. 2-00:00:00 is two days maximum runtime limit NODES : Count of nodes with this particular configuration e.g. 48 nodes STATE : State of the nodes. Possible states include: allocated, down, drained, and idle. For example, the state \u0026ldquo;idle\u0026rdquo; means that the node is not allocated to any jobs and is available for use. NODELIST List of node names associated with this queue/partition The sinfo example below, reports more complete information about the partition/queue short-serial\nsinfo --long --partition=short-serial Tue May 12 18:04:54 2020 PARTITION AVAIL TIMELIMIT JOB_SIZE ROOT OVERSUBS GROUPS NODES STATE NODELIST short-serial* up 1-00:00:00 1-infinite no NO all 48 idle host[146-193] How to choose a Slurm queue/partition \u0026nbsp; Test queue \u0026nbsp; The test queue can be used to test new workflows and also to help new users to familiarise themselves with the Slurm batch system. Both serial and parallel code can be tested on the testqueue. The maximum runtime is 4 hrs and the maximum number of jobs per user is 8 job slots. The maximum number of cores for a parallel job e.g. MPI, OpenMP, or multi-threads is limited to 8 cores. The testqueue should be used when unsure of the job resource requirements and behavior at runtime because it has a confined set of LOTUS nodes (Intel node type) not shared with the other standard LOTUS queues.\nSerial queues \u0026nbsp; Serial and array jobs with a single CPU core should be submitted to one of the following serial queues depending on the job duration and the memory requirement. The default queue is short-serial\nshort-serial \u0026nbsp; Serial and/or array jobs with a single CPU core each and run time less than 24 hrs should be submitted to the short-serial queue . This queue has the highest priority of 30. The maximum number of jobs that can be scheduled to start running from the short-serial is 2000 jobs whilst both job\u0026rsquo;s resources are available and user\u0026rsquo; priority is high\nlong-serial \u0026nbsp; Serial or array jobs with a single CPU core and run time greater than 24 hrs and less than 168 hrs (7 days) should be submitted to the queue long-serial . This queue has the lowest priority of 10 and hence jobs might take longer to be scheduled to run relatively to other jobs in higher priority queues.\nhigh-mem \u0026nbsp; Serial or array jobs with a single CPU core and high memory requirement (\u0026gt; 64 GB) should be submitted to the high-mem queue and the required memory must be specified --mem=XXX (XXX is in MB units). The job should not exceed the maximum run time limit of 48hrs. This queue is not configured to accept exclusive jobs.\nParallel queues \u0026nbsp; Jobs requiring more than one CPU core should be submitted to one of the following parallel queues depending on the type of parallelisms such as shared memory or distributed memory jobs.\npar-single \u0026nbsp; Shared memory multi-threaded jobs with a maximum of 16 threads should be submitted to the par-single queue . Each thread should be allocated one CPU core. Oversubscribing the number of threads to the CPU cores will cause the job to run very slow. The number of CPU cores should be specified via the submission command line sbatch -n \u0026lt;number of CPU cores\u0026gt; or by adding the Slurm directive #SBATCH -n \u0026lt;number of CPU cores\u0026gt;in the job script file. An example is shown below:\nsbatch --ntasks=4 --partition=par-single \u0026lt; myjobscript Note: Jobs submitted with a number of CPU cores greater than 16 will be terminated (killed) by the Slurm scheduler with the following statement in the job output file:\npar-multi \u0026nbsp; Distributed memory jobs with inter-node communication using the MPI library should be submitted to the par-multi queue . A single MPI process (rank) should be allocated a single CPU core. The number of CPU cores should be specified via the Slurm submission command flag sbatch -n \u0026lt;number of CPU cores\u0026gt; or by adding the Slurm directive #SBATCH -n \u0026lt;number of CPU cores\u0026gt; to the job script file. An example is shown below:\nsbatch --ntasks=4 --partition=par-multi \u0026lt; myjobscript Note 1: The number of CPU cores gets passed from Slurm submission flag -n . Do not add the -np flag to mpirun command .\nNote 2: Slurm will reject a job that requires a number of CPU cores greater than the limit of 256."
      })
      .add(
      
      
      {
        id: 104,
        tag: "en",
        href: "/docs/batch-computing/slurm-quick-reference/",
        title: "Slurm quick reference",
        description: "Slurm commands and environment variables",
        
        
        content: "Slurm Scheduler \u0026nbsp; Slurm is the job scheduler deployed on JASMIN. It allows users to submit, monitor, and control jobs on the LOTUS (CPU) and ORCHID (GPU) clusters.\nEssential Slurm commands \u0026nbsp; Slurm command Description sbatch script_file Submit a job script to the scheduler sinfo Show available scheduling queues squeue -u \u0026lt;username\u0026gt; List user\u0026rsquo;s pending and running jobs srun -n 1 -p test --pty /bin/bash Request an interactive session on LOTUS Job specification \u0026nbsp; Long and short argument names are separated by a comma.\n#SBATCH \u0026nbsp; Scheduler directive - goes in front of the arguments below in a job script file An example Slurm job script file is available here --partition=QUEUE_NAME, -p QUEUE_NAME \u0026nbsp; Specify the scheduling queue/partition by replacing QUEUE_NAME A list of queues/partitions that you can use are available here --time=hh:mm:ss, -t hh:mm:ss \u0026nbsp; Set the maximum runtime limit by replacing hh:mm:ss --time-min=hh:mm:ss \u0026nbsp; Set an estimated runtime by replacing hh:mm:ss --job-name=JOB_NAME \u0026nbsp; Specify a name for the job by replacing JOB_NAME --output=FILE_NAME, -o FILE_NAME \u0026nbsp; Standard job output - where your program prints to normally (stdout) Defaults: appends to the file and file name is slurm-%j.out, where %j is replaced by the job ID --error=FILE_NAME, -e FILE_NAME \u0026nbsp; Standard error output - where your program prints to if an error occurs (stderr) Defaults: appends to the file and file name is slurm-%j.err, where %j is replaced by the job ID --open-mode=append|truncate \u0026nbsp; Write mode for error/output files Pick either append or truncate --mem=XXX \u0026nbsp; Specify that XXX memory is required for the job. Default units are megabytes (e.g. --mem=250 means 250MB) --array=INDEX \u0026nbsp; Specify a job array, e.g. --array=1-10 - for an example submission script, see this page The default standard output file name is slurm-%A_%a.out, where %A is replaced by the job ID and %a with the array index To change this, use --output and --error as above with %A and %a instead of %j --array=INDEX%ArrayTaskThrottle \u0026nbsp; A maximum number of simultaneously running tasks from the job array may be specified using a % separator For example, --array=1-15%4 will limit the number of simultaneously running tasks from this job array to 4 --chdir=DIRECTORY, -D DIRECTORY \u0026nbsp; Set the working directory of the batch script to DIRECTORY before it is executed --exclusive \u0026nbsp; Exclusive execution mode --dependency=\u0026lt;dependency_list\u0026gt; \u0026nbsp; Defer the start of this job until the specified dependencies have been satisfied as completed See the Slurm documentation for examples --ntasks=NUMBER_OF_CORES, -n NUMBER_OF_CORES \u0026nbsp; Number of CPU cores --constraint=HOST_GROUP_NAME \u0026nbsp; To select a node with a specific processor model A list of host groups that you can use are available here Job control commands \u0026nbsp; Slurm command Description scancel \u0026lt;jobid\u0026gt; Kill a job scontrol show job \u0026lt;jobid\u0026gt; Show details job information scontrol update job \u0026lt;jobid\u0026gt; Modify a pending job scancel --user=\u0026lt;username\u0026gt; Kill all jobs owned by a user Job environment variables \u0026nbsp; Slurm variable Description $SLURM_JOBID Job identifier number $SLURM_ARRAY_JOB_ID Job array $SLURM_ARRAY_TASK_ID Job array index $SLURM_ARRAY_TASK_MAX Last index number within a job array $SLURM_NTASKS Number of processors allocated"
      })
      .add(
      
      
      {
        id: 105,
        tag: "en",
        href: "/docs/batch-computing/slurm-scheduler-overview/",
        title: "Slurm scheduler overview",
        description: "Overview of the LOTUS batch scheduler, Slurm",
        
        
        content: "What is a Job Scheduler? \u0026nbsp; A job or batch scheduler, is a tool that manages how user jobs are queued and run on a set of compute resources. In the case of LOTUS the compute resources are the set of compute nodes that make up the LOTUS hardware. Each user can submit jobs to the scheduler which then decides which jobs to run and where to execute them. The scheduler manages the jobs to ensure that the compute resources are being used efficiently and that users get appropriate access to those resources.\nThe Slurm Scheduler \u0026nbsp; Slurm is the job scheduler deployed on JASMIN. It allows users to submit, monitor, and control jobs on the LOTUS cluster.\nGeneral principles for working with Slurm \u0026nbsp; Before learning how to use Slurm, it is worthwhile becoming familiar with the basic principles of scheduler operation in order to get the best use out of the LOTUS cluster. Scheduler software exists simply because the amount of jobs that users wish to run on a cluster at any given time is usually greatly in excess of the amount of resources available. This means that the scheduler must queue jobs and work out how to run them efficiently.\nSeveral factors are taken into account during scheduling, such as job duration and size, but the basic principles remain the same throughout - every user gets a fair share of the cluster based on the jobs that they have submitted. This leads to a small number of important principles:\nDo not try to second guess the scheduler! Submit all of your jobs when you want to run them and let the scheduler figure it out for you. You will get a fair share, and if you don\u0026rsquo;t then we need to adjust the scheduler (so get in touch and let us know). Give the scheduler as much information as possible. There are a number of optional parameters (see \u0026ldquo;How to submit jobs\u0026rdquo;) such as job duration, and if you put these in then you have an even better chance of getting your jobs to run. It is very difficult for one user to monopolise the cluster, even if they submit thousands of jobs. The scheduler will still aim to give everyone else a fair share, so long as there are other jobs waiting to be run. Fair share for all users \u0026nbsp; Example of scheduling In the example above, three users (left column) have jobs in the queue (middle column) which are waiting to run on the cluster (right column). As the blue user\u0026rsquo;s job finishes (middle row), all three users could potentially use the two job slots that become available. However, the orange and purple users already have jobs running, whereas the blue user does not, and as such it is the blue user\u0026rsquo;s jobs that are run (bottom row).\nLOTUS queues \u0026nbsp; There are five standard Slurm queues (also known as \u0026ldquo;partitions\u0026rdquo; in Slurm terminology) for batch job submissions to the LOTUS cluster: short-serial, long-serial, par-single, par-multi and high-mem. The default queue is short-serial. For testing new workflows, the additional queue testis recommended. The specification of each queue is described in detail in this article: Slurm queues on LOTUS\nQueues other than the five standard queues with the test queue should be ignored unless you have been specifically instructed to use them.\nThe typical workflow for LOTUS jobs \u0026nbsp; One of the great advantages of using JASMIN is the ability to create batch jobs that run simultaneously on multiple LOTUS nodes. However, users familiar with running interactively on a single machine often take time to adapt to this new way of working. The change involves moving from a \u0026ldquo;watching your job run\u0026rdquo; approach to \u0026ldquo;submitting your job and coming back later\u0026rdquo;.\nThe typical workflow for setting up and running LOTUS jobs is as follows:\nLogin to one of the scientific analysis servers. Install/write/configure your processing code. Test your code interactively: run it locally in a single-process test case. Create a wrapper script for your code that allows multiple versions to run independently: e.g. running for different dates or processing different spatial regions/variables. Submit your jobs via the batch script. Monitor your jobs. Gather/analyse/review the outputs as required. Project-specific LOTUS queues \u0026nbsp; Occasionally a project has a specific requirement for a collection of compute nodes that involve the provision of a project-specific queue. If you are working on such a project your project lead will provide guidance on which queue to use. Please contact the helpdesk if you are interested in setting up a project-specific queue."
      })
      .add(
      
      
      {
        id: 106,
        tag: "en",
        href: "/docs/batch-computing/slurm-status/",
        title: "Slurm status",
        description: "LOTUS/ORCHID Slurm scheduler status",
        
        
        content: "The JASMIN dashboard includes an overview of: LOTUS queues/partitions status, including the number of running/completed/pending jobs and further information about the usage of the LOTUS and ORCHID clusters.\nlotus status Figure 1. LOTUS dashboard"
      })
      .add(
      
      
      {
        id: 107,
        tag: "en",
        href: "/docs/software-on-jasmin/software-overview/",
        title: "Software Overview",
        description: "Overview of software on JASMIN",
        
        
        content: "JASMIN is a large platform where a range of software tools, packages and environments are available. Many users employ software already installed on JASMIN whilst some need to install their own tools for a particular purpose.\nThis page provides an overview of the software on JASMIN. It links to further information about a range of tools and environments.\nTo help get you started, these have been split into categories:\nSoftware available to all on JASMIN analysis/batch servers Additional tools for compiling and building software Restricted software Server-specific software Data movement software Which software should I use? \u0026nbsp; There are a lot of different options when you are trying to work out which tools and/or environments to use on JASMIN. Here are some quick questions to help you get started:\n1. Do you want to use NAME, JULES, MOOSE or the NAG libraries?\nIf yes, see: Restricted software 2. Do you want a workflow management tool or a graphical Linux desktop?\nIf yes, see: Server-specific software 3. Do you want tools for transferring data or migrating it to/from tape?\nIf yes, see: Data movement software 4. If you need anything else:\nSee: Software available to all on JASMIN analysis/batch servers Software available on all sci/batch nodes \u0026nbsp; Data analysis and visualisation tools \u0026nbsp; If you are looking for software packages and environments that allow you to analyse, process and visualise data then take a look at these options:\nJaspy software environments (Python, R and other tools) The \u0026ldquo;jasmin-sci\u0026rdquo; software environment (packages not provided by Jaspy) Additional packages (provided under: \u0026ldquo;/apps/jasmin\u0026rdquo;) IDL (and MIDL) Creating your own software environments NOTE : If you are using Matplotlib to visualise data please refer to the advice on our Matplotlib help page.\nJaspy Software Environments (Python, R and other tools) \u0026nbsp; Jaspy is a toolkit for managing and deploying Conda environments that include both Python and non-Python packages. Jaspy environments, along with the \u0026ldquo;jasmin-sci\u0026rdquo; environment (see below), provide the main software on the scientific analysis servers and LOTUS cluster on JASMIN. Details of the Jaspy environments and packages are available on the Jaspy page.\nThe \u0026ldquo;jasmin-sci\u0026rdquo; Software Environment \u0026nbsp; The \u0026ldquo;jasmin-sci\u0026rdquo; software environment is intended as a supplement to Jaspy (see above). It contains extra software packages for use with scientific data analysis which, for various reasons, are not provided as part of Jaspy itself. Details of this environment are provided on the \u0026ldquo;jasmin-sci\u0026rdquo; software page.\nAdditional packages \u0026nbsp; A number of additional packages are available under the \u0026ldquo;/apps/jasmin/\u0026rdquo; directory scientific analysis servers and LOTUS cluster. Details of these packages are provided on the additional sofware packages page.\nIDL \u0026nbsp; IDL stands for Interactive Data Language. It is a licensed data manipulation toolkit made available on JASMIN. IDL is available on the JASMIN scientific analysis servers and LOTUS cluster. See IDL .\nCreating your own software environments \u0026nbsp; If you intend to create your own software environments then please take a look at the following pages:\nBuilding virtual environments on top of Jaspy environments Sharing your JASMIN software environments with other users Compilers on JASMIN Restricted software available on specific servers \u0026nbsp; Workflow Management with Rose and Cylc \u0026nbsp; Rose and Cylc provide a suite of tools available for managing sophisticated multi-step workflows. See full details on the Rose and Cylc page.\nGraphical Linux desktop access using NoMachine NX \u0026nbsp; NoMachine NX is a tool that allows users to run a virtual graphical Linux desktop on JASMIN. See details on the NX page.\nData movement software \u0026nbsp; Data transfer \u0026nbsp; There are numerous tools for transferring data to/from JASMIN. Please consult the Data Transfer Tools page for details.\nData migration disk/tape \u0026nbsp; The Joint Data Migration App, or JDMA, is a flexible tool for managing large migrations of data between a range of storage media. On JASMIN, it can be used for migrating data to/from tape, disk and object-store. See more details on the JDMA page.\nStill have a question? \u0026nbsp; Please consult the JASMIN software FAQs."
      })
      .add(
      
      
      {
        id: 108,
        tag: "en",
        href: "/docs/getting-started/ssh-auth/",
        title: "SSH public key authentication",
        description: "SSH public key authentication",
        
        
        content: "JASMIN employs SSH public key authentication for login instead of username and password. This article provides a basic overview of public key authentication.\nPublic key authentication (for SSH) \u0026nbsp; SSH stands for \u0026ldquo;Secure Shell\u0026rdquo;, a protocol that allows login to another computer over the network. This allows the user to execute commands on a remote machine. SSH uses encryption to keep the connection secure so that it is more difficult for hackers to passwords or other sensitive information that may pass through the connection.\nPublic key authentication is an alternative means of identifying yourself to a login server, instead of typing a password. It is more secure and flexible, but can appear more difficult for new users.\nWhy is public key authentication more secure than a password? \u0026nbsp; When using conventional username/password authentication you will type your password when you log on to a server. If the server you are working on has been compromised then an attacker could learn your password and then use it to gain access to the remote server you are connecting to.\nWith public key authentication, the private key is kept only on your own machine and the passphrase to unlock it is entered there too. An attacker would require both knowledge of the passphrase used to protect your private key as well as the private key file itself.\n\u0026nbsp; It is imperative that your private key is protected by a strong passphrase so that only you can use it. Public key authentication setup \u0026nbsp; Setting up SSH keys involves the following steps:\nCreate a pair of SSH keys (public and private with associated passphrase ). Provide the public key to remote machines/services that you wish to login to. See instructions for setting this up on JASMIN.\nLogin with your SSH key pair \u0026nbsp; Once you have set up your key pair and provided your public key to the remote machine the process is as follows:\nLoad the private key into an \u0026ldquo;authentication agent\u0026rdquo; (such as ssh-agent) on your local machine. Use an SSH client (such as the ssh command) to login to the remote server. See instructions for setting this up on JASMIN.\nLogging in from multiple machines \u0026nbsp; If you have a requirement to login to your JASMIN account from multiple servers/locations then please copy your private key file securely to the ~/.ssh directory on the new machine. Note that you should restrict access the private key so it is only readable by you.\nUsing public key authentication with other applications \u0026nbsp; Many other tools use the SSH protocol for their communication with remote servers or services, for example rsync, scp, git and subversion."
      })
      .add(
      
      
      {
        id: 109,
        tag: "en",
        href: "/docs/for-cloud-tenants/sysadmin-guidance-external-cloud/",
        title: "System administration guidance (external cloud)",
        description: "System administration guidance (external cloud)",
        
        
        content: "Managing storage \u0026nbsp; When provisioned, a virtual machine gets allocated a small hard disk (the exact size of the disk depends on the selected machine size). This disk is intended to run the operating system only. If you require additional storage for data, it is possible to add extra volumes to a virtual machine.\nFirst, create a new volume by navigating to the volumes tab and clicking on \u0026ldquo;New Volume\u0026rdquo;:\ncreate volume dialogue This will launch a dialog that allows you to specify a name and size for the volume:\nspecify name and size for volume Once the volume becomes available, you can attach it to a VM. First, click on the \u0026ldquo;Actions\u0026rdquo; button and select \u0026ldquo;Attach volume to machine\u0026rdquo;:\nmenu options This will open a dialog allowing you to select the VM that you want to attach the volume to:\nattach volume to VM Once the volume has attached to the VM, the new disk will be visible to the machine but will not be usable. This can be verified using the lsblk command:\nlsblk NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT sda 8:0 0 4G 0 disk └─sda1 8:1 0 4G 0 part / sdb 8:16 0 50G 0 disk Here, we can see that the operating system is recognising the new disk - sdb - but there are no partitions or file systems associated with it. To make the disk usable, it must be formatted with a filesystem and mounted somewhere, e.g. /data:\n# Create a single partition spanning the whole disk fdisk /dev/sdb Device contains neither a valid DOS partition table, nor Sun, SGI or OSF disklabel Building a new DOS disklabel with disk identifier 0x598d636f. Changes will remain in memory only, until you decide to write them. After that, of course, the previous content won\u0026#39;t be recoverable. Warning: invalid flag 0x0000 of partition table 4 will be corrected by w(rite) Command (m for help): n Partition type: p primary (0 primary, 0 extended, 4 free) e extended Select (default p): Using default response p Partition number (1-4, default 1): Using default value 1 First sector (2048-33554431, default 2048): Using default value 2048 Last sector, +sectors or +sizeK,M,G (2048-33554431, default 33554431): Using default value 33554431 Command (m for help): w The partition table has been altered! Calling ioctl() to re-read partition table. Syncing disks. # Verify that the partition was created lsblk /dev/sdb NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT sdb 8:16 0 16G 0 disk └─sdb1 8:17 0 16G 0 part # Create a filesystem on the partition mkfs.ext4 /dev/sdb1 mke2fs 1.42.9 (4-Feb-2014) Filesystem label= OS type: Linux Block size=4096 (log=2) Fragment size=4096 (log=2) Stride=0 blocks, Stripe width=0 blocks 1048576 inodes, 4194048 blocks 209702 blocks (5.00%) reserved for the super user First data block=0 Maximum filesystem blocks=4294967296 128 block groups 32768 blocks per group, 32768 fragments per group 8192 inodes per group Superblock backups stored on blocks: 32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 4096000 Allocating group tables: done Writing inode tables: done Creating journal (32768 blocks): done Writing superblocks and filesystem accounting information: done # Mount the filesystem mkdir /data mount /dev/sdb1 /data # Verify that the filesystem is now available lsblk NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT sda 8:0 0 4G 0 disk └─sda1 8:1 0 4G 0 part / sdb 8:16 0 50G 0 disk └─sdb1 8:17 0 50G 0 part /data df -h Filesystem Size Used Avail Use% Mounted on /dev/sda1 4.0G 1.4G 2.7G 34% / devtmpfs 222M 0 222M 0% /dev tmpfs 245M 0 245M 0% /dev/shm tmpfs 245M 8.8M 236M 4% /run tmpfs 245M 0 245M 0% /sys/fs/cgroup tmpfs 49M 0 49M 0% /run/user/0 /dev/sdb1 50G 53M 47G 1% /data # Add a line to /etc/fstab to make the mount persistent (i.e. automatic mount on boot) echo \u0026#34;/dev/sdb1 /data ext4 defaults 0 0\u0026#34; \u0026gt;\u0026gt; /etc/fstab"
      })
      .add(
      
      
      {
        id: 110,
        tag: "en",
        href: "/docs/interactive-computing/tenancy-sci-analysis-vms/",
        title: "Tenancy Sci Analysis VMs",
        description: "Tenancy-Sci Analysis VMs",
        
        
        content: "This document explains how to access a tenancy-based sci machine. These are normally provisioned by an admin/manager representing a particular community/institution.\nCheck which institutions/group you belong to:\nNCAS, NCEO, UKMO, RSG, \u0026hellip;\nThe admin/manager will provide you the name of the tenancy. You can then search for it on your JASMIN accounts portal under the JASMIN service named Sci Analysis VMs.\nHow to request access \u0026nbsp; Step 1: Find the Sci Analysis VMs under the Menu \u0026lsquo;Discover services\u0026rsquo; at https://accounts.jasmin.ac.uk/services/\nStep 2: Check the name of the service and the description that your supervisor or PI recommended you to choose and click \u0026ldquo;More information\u0026rdquo;\nLocate the correct service Click +Apply Step 3: Apply for USER role and provide details on your project and a reference then click \u0026ldquo;Apply\u0026rdquo;\nApply for USER role Step 4: Notification\nStatus PENDING Once your request was approved, you will get a notification\nNotification Status updated to ACTIVE If your request was rejected, then reapply and provide further supporting information\nRejected: further info requested Click on the rejection notification. This will take you to the following page where you can \u0026ldquo;Apply again\u0026rdquo;\nRequest for further detail How to login \u0026nbsp; The machine will not be accessible directly externally, so you need to access it via a JASMIN login machine: don\u0026rsquo;t forget the -A (agent forwarding) option on your initial connection.\nssh -A user@login2.jasmin.ac.uk Access the VM using the IP address (not the hostname) of the virtual machine. Your manager should be able to provide you with this, since they created (provisioned) the virtual machine.\nssh -A user@\u0026lt;IP-ADDRESS-OF-VM\u0026gt; How to report issues \u0026nbsp; Users should report issues to the ADMIN and/or MANAGER/DEPUTY of the tenancy based SCI VM initially, rather than the JASMIN team. If the issue cannot be resolved by the ADMIN and/or MANAGER, they should contact the JASMIN helpdesk. You can find the name of the current holders of the MANAGER/DEPUTY roles by going to the page which described the service on the accounts portal, as above."
      })
      .add(
      
      
      {
        id: 111,
        tag: "en",
        href: "/docs/software-on-jasmin/jasmin-sci-software-environment/",
        title: "The \"jasmin-sci\" software environment",
        description: "The \"jasmin-sci\" software environment",
        
        
        content: "Introduction \u0026nbsp; This article describes the jasmin-sci software environment on JASMIN. It covers the following topics:\nOverview of the jasmin-sci software environment Activating and deactivating the jasmin-sci environment Using the jasmin-sci environment with Jaspy Overview of the \u0026ldquo;jasmin-sci\u0026rdquo; software environment \u0026nbsp; The jasmin-sci software environment is intended as a supplement to Jaspy and contains extra software packages for use with scientific data analysis which, for various reasons, are not provided as part of Jaspy itself. These packages are generally installed on the same machines where Jaspy is available, for example, the sci machines (e.g. sci1.jasmin.ac.uk) and LOTUS nodes, but not the login machines. It is not intended for the jasmin-sci environment itself to provide a complete suite of analysis software.\nThe packages included in jasmin-sci are provided via RPMs. A list of explicitly included packages can be seen using the command rpm -qR jasmin-sci, although some additional packages may be installed to satisfy dependencies.\nThe packages fall into two categories:\nPackages provided by standard RPM repositories (example \u0026ldquo;gnuplot\u0026rdquo;) - these are installed into ordinary system paths (such as /usr/bin/gnuplot for the gnuplot program) and require no special setup in order to run. So if you are on a relevant machine, you should just be able to type gnuplot. Packages which we have built locally for use on JASMIN (although most are third-party software). To avoid any potential later conflicts with standard packages, they are installed under the path /opt/rh/jasmin-sci/ rather than in system paths. Also, the RPM package names, as can be seen in the above rpm -qR jasmin-sci command, are prefixed with jasmin-sci-. So for example, the local build of nccmp (a program to compare netCDF files) is a package called jasmin-sci-nccmp, and the executable is at /opt/rh/jasmin-sci/root/usr/bin/nccmp. Before these packages can be conveniently used, it is necessary to \u0026ldquo;activate\u0026rdquo; the environment as described below, so that when you type e.g. \u0026ldquo;nccmp\u0026rdquo; the relevant files can be found. Unlike the Jaspy environments, jasmin-sci can only provide one version of each package at a time, so the versions are subject to change when updates are done. If we anticipate any important changes, then we will notify JASMIN users by email.\nIn a few cases, software packages are provided in jasmin-sci which are also provided in Jaspy. This is only done where other RPM packages depend on it. For example, the netcdf package is provided in Jaspy, but is also installed as an RPM because the nccmp package requires it. This means that copies of the netCDF libraries exist both in Jaspy (for the full path, type nc-config --libs after activating Jaspy) and also under /usr/lib64 (from the RPM). When linking code to the netCDF library, it is recommended to use the one in Jaspy because this will be version controlled. Also, although the jasmin-sci software might provide some software that happens to be implemented in Python, any such Python modules are not intended to be imported into your own code. For Python development, packages from Jaspy should be used.\nThe development for jasmin-sci takes place via the extra-sci-packages GitHub repository, and an associated issues page. The readme file on the repository has some package- specific documentation (including how to build the python bindings for Misr toolkit).\nActivating and deactivating the \u0026ldquo;jasmin-sci\u0026rdquo; environment \u0026nbsp; To activate the jasmin-sci environment, use the command:\nmodule load jasmin-sci and to deactivate it, use the command:\nmodule unload jasmin-sci (\u0026ldquo;add\u0026rdquo; and \u0026ldquo;purge\u0026rdquo; can also be used).\nThe module load command must be done in each session, or added to your $HOME/.bashrc file.\nAs mentioned above, this is only required for a subset of packages in jasmin- sci. The majority of packages do not require it, but for example, those which do include ferret, and the leafpad (notepad-like) editor.\nFerret users should note that it is still necessary to do \u0026ldquo;source ferret_paths.sh\u0026rdquo; after activating jasmin-sci, in order for ferret to find all its additional resource files.\nUsing the \u0026ldquo;jasmin-sci\u0026rdquo; environment with Jaspy \u0026nbsp; To activate both jasmin-sci and Jaspy, it is best to activate them in the following order:\nmodule load jasmin-sci module load jaspy This will ensure that in the unlikely event of an executable in Jaspy also existing under /opt/rh/jasmin-sci/, then one in Jaspy will take priority.\nThe corresponding module unload commands can be done in either order."
      })
      .add(
      
      
      {
        id: 112,
        tag: "en",
        href: "/docs/getting-started/tips-for-new-users/",
        title: "tips-for-new-users",
        description: "Tips for new users",
        
        
        content: "These tips for new users are based on users\u0026rsquo; queries encountered by our helpdesk. They are not exhaustive but may help solve some initial problems and set out best practice.\nSci machines LOTUS Xfer servers How to report an issue \u0026ldquo;Sci\u0026rdquo; machines usage guidelines \u0026nbsp; Check the current load and number of users on the sci machines, as shown by the login servers, to select a less-used sci machine. The available Sci machines and their specifications are listed in the table of this help page The sci machines are not for running large, long-running tasks, or scripts that spawn multiple child processes. The batch processing cluster LOTUS is available for heavier processing. The sci machines are for development, testing, and light interactive use. Overloading these with processing seriously impairs performance for interactive use by others. Do not write to the temporary partition /tmpon sci machines. Use your home directory, a scratch volume or a Group Workspace . Any temporary data files can reside in a subdirectory of your group workspace instead of /tmp. To do this, please add the following lines (or similar) to your $HOME/.bashrc file: export TMPDIR=/group_workspaces/jasmin/\u0026lt;your_project\u0026gt;/\u0026lt;your_username\u0026gt;/tmp ## create the directory if needed [ -d $TMPDIR ] || mkdir -p $TMPDIR If a process hangs, do not simply close the terminal window. Please contact the helpdesk and alert the team so that the process can be shut down. Otherwise hung processes build up and contribute to machine overloading. Do not “hog” IDL development licenses. A limited number of these are available for development and compilation of IDL code which should then be run on LOTUS using IDL runtime licenses, of which there are many more. Do not use sci machines for data transfer: xfer hosts are provided for this purpose. LOTUS usage guidelines \u0026nbsp; Do not use IDL development licences on LOTUS. There are many runtime licenses available, but the development licenses are for interactive use on the sci machines, where IDL code can be compiled, then run on LOTUS using a runtime license. Beware of inadvertently filling up /tmp on LOTUS nodes. This can take nodes out of action (perhaps for other users who still have jobs running on the same node) if /tmp fills up. Design your code to clean up as it goes along, and use environment variables to control where your applications write temporary data, ideally to storage which is not specific to a LOTUS node. If your job crashes, check which nodes were involved and clean up after yourself. Do not store data in scratch areas for long periods of time. Move data away to group workspaces once your processing has finished. Xfer servers guidelines \u0026nbsp; Do not run a large number (\u0026gt;16) of rsync or scp transfer processes in parallel. Do not run processing on xfer servers: they are provided for data transfer only For heavy/high-performance data transfers, avoid virtual machines jasmin-xfer1/cems-xfer1 and consider using high-performance servers or methods. How to report an issue \u0026nbsp; When you do experience an issue, please;\nMake it clear whether you are simply advising the helpdesk of a general issue (which will be noted, but not necessarily investigated for a specific response), or Provide FULL and SPECIFIC details of your problem so that it can be investigated. JASMIN is a complex infrastructure with many hundreds of hosts and storage volumes, so reporting that “JASMIN” or “Storage” is slow, is not sufficient. If you are experiencing difficulties accessing a particular storage volume from a particular sci machine, please state: the full path to the data you are trying to access: the full hostname of the machine (but please try the same access from at least one other machine to help establish whether it’s related to the machine or the storage) the date and time of the issue (for matching up with system reports/log files. Using the date and time of the email is not sufficient: please be specific in your report) Be patient and understand that, particularly at present (where nearly the entire CEDA and JASMIN teams are working remotely), queries will take longer to resolve. Some issues will only be resolved by strategic improvements which are planned as part of phased upgrades to JASMIN accompanied by capital procurements followed by integration work, all carried out by the same, small team."
      })
      .add(
      
      
      {
        id: 113,
        tag: "en",
        href: "/training/basic/training-exercises-coming-soon/",
        title: "Training exercises coming soon",
        description: "Exercises to help you get the most out of JASMIN",
        
        
        content: "Watch this space \u0026nbsp; We\u0026rsquo;ll be adding more content soon, as we reorganise the JASMIN help content further.\nFor now, please see JASMIN Training Workshop materials\u0026nbsp; ."
      })
      .add(
      
      
      {
        id: 114,
        tag: "en",
        href: "/training/intermediate/training-exercises-coming-soon/",
        title: "Training exercises coming soon",
        description: "Exercises to help you get the most out of JASMIN",
        
        
        content: "Watch this space \u0026nbsp; We\u0026rsquo;ll be adding more content soon, as we reorganise the JASMIN help content further.\nFor now, please see JASMIN Training Workshop materials\u0026nbsp; ."
      })
      .add(
      
      
      {
        id: 115,
        tag: "en",
        href: "/docs/short-term-project-storage/xfc/",
        title: "Transfer Cache (XFC)",
        description: "Transfer Cache (XFC)",
        
        
        content: "What is the XFC? \u0026nbsp; The Transfer Cache (XFC) provides a large area of temporary storage for users of JASMIN to store large files and/or a large volume of files on a short-term basis.\nUsers are granted a quota of space in their user area on the temporary storage. When users exceed their quota some of their files will be deleted automatically.\nUsers interact with the XFC in two ways:\nto initialise their user area, and to get information about their quota, a command-line client is used. to move data in and out of their user area, the standard UNIX command-line tools (cp, mkdir, rm, mv, rsync, etc.) are used. Quotas \u0026nbsp; XFC has two different types of quota. The first is the \u0026ldquo;hard quota\u0026rdquo; (HQ). This is the absolute maximum volume of data that can be stored in the user area. This is expressed in TB (terabytes).\nThe second type of quota is the \u0026ldquo;temporal quota\u0026rdquo; (TQ). This is expressed in units of TB day (terabyte days), and has a time component as well as a data volume component. For an individual file, the TQ for that file is the product of the size of the file and the number of days the file has been in the user area. As an example, if the user moves a 2TB file into their area, after 24 hours it will have used 2TB days of the TQ. After 48 hours it will have used 4TB days and after 1 week it will have used 14TB days.\nFinally, any file in the XFC can have a maximum persistence of 365 days. i.e. if a file is in XFC for more than one year then it will be deleted by the automatic deletion.\nThe above figure shows an example of the quota system in use. The red line shows the temporal quota used (TQ) and the blue line shows the hard quota (HQ).\nThe user initialises their XFC. On day 5 , the user copies a 1 TB file into their XFC For the next 4 weeks (on days 12 , 19 , 26 and 31 ) the user copies in another 1 TB file The TQ steadily grows until on day 79 it has reached its limit of 300TB days, the first 1TB file is deleted On day 98 another 1TB file is deleted On day 120 , the user copies 10TB into their XFC On days 122 , 130 and 140 the 1TB files that were copied in on days 19 , 26 and 31 are deleted. On day 151 , the 10TB file is deleted. Default Quota values: \u0026nbsp; The default Hard Quota (HQ) is 10 TB\nThe default Time Quota (TQ) is 300 TB\nSo you could store 10TB of data for 30 days before risking the deletion of data.\nAdditionally, an overall time limit of 365 days is set for ALL data stored by a given user. You cannot store any data, no matter how small, for longer than 365 days.\nAutomatic deletion \u0026nbsp; If users exceed either their temporal quota or hard quota, then files in their user area will be deleted automatically. The deletion process will delete as many files as necessary to bring the amount of HQ and TQ below the quotas allocated to the user. Files will be deleted on an age basis. Those files that were copied into the user area first will be deleted first, with newer files deleted after these.\nThe user can be notified which files will be deleted if they switch the option to be notified on and supply an email address in the XFC client. Files will be deleted 24 hours after the notification.\nIf a file is modified between the notification and the scheduled deletion (24 hours later) then the file will not be deleted. However, the automatic deletion is relentless and it will choose some other file to delete instead. XFC is not designed as permanent storage and the automatic deletion process has been designed to discourage long term storage of files on it.\nUsing XFC \u0026nbsp; JASMIN provides access to XFC via a command-line client: xfc\nOnce installed into your $HOME directory (using one of the sci servers), the xfc client can be run on either the sci (sci[1-8].jasmin.ac.uk) or xfer (xfer[12].jasmin.ac.uk) servers, but should NOT be run on the high-performance transfer servers hpxfer[12].jasmin.ac.uk.\nThe client is used only for interacting with the service, but is not needed for accessing the storage it provides. The storage provided is mounted in most places across JASMIN: the path to your XFC volume is returned by the client in one of the steps shown below.\nUsers are expected to use the xfer servers or a high-performance data transfer service to do any data transfers either within or in/out of JASMIN. This reduces the load on the sci servers which are for general-purpose interactive computing.\nThe xfc client is used to initialise and then query the status (quota, scheduled deletions etc) of a user\u0026rsquo;s XFC storage volume:\nTo see all the available options: xfc -h To initialise your user area: xfc init xfc init ** SUCCESS ** - user initiliazed with: username: username email: user.name@stfc.ac.uk quota: 300TB path: /work/xfc/vol1/user_cache/username The path is the path on the JASMIN system to the user area. Data can be copied here using standard UNIX command-line tools cp, mv, rsync. Subdirectories can be created using mkdir. Change read/write permissions on the directories and files using chmod, etc. The user area is just a standard POSIX directory and so any POSIX commands can be used on it.\nTo get the user area path again: xfc path /work/xfc/vol1/user_cache/username To set the user email for notifications: xfc email --email=user.name@stfc.ac.uk ** SUCCESS ** - user email updated to: user.name@stfc.ac.uk To query the email set for the user: xfc email xfc email user.name@stfc.ac.uk To switch deletion notifications on / off: xfc notify ** SUCCESS ** - user notifcations updated to: on To see remaining quota: xfc quota ------------------------ Quota for user: username ------------------------ Temporal Quota (TQ) Used : 1.7 TB Allocated : 300.0 TB Remaining : 298.3 TB ------------------------ Hard Quota (HQ) Used : 444.9 GB Allocated : 40.0 TB Remaining : 39.6 TB To see which files are scheduled for deletion: xfc schedule No files scheduled for deletion To list the files in your user area: xfc list user_cache/username/historical/.ftpaccess user_cache/username/historical/00README_catalogue_and_licence.txt user_cache/username/historical/day/atmos/day/r1i1p1/COPY_CURRENT_20150326.txt Pattern matching can be used to search for a file. This is just a simple substring search, e.g. r1i1p1_19500101-19541231.nc\nxfc list -m r1i1p1_19500101-19541231.nc user_cache/username/historical/day/atmos/day/r1i1p1/v20120907/va/va_day_CMCC-CESM_historical_r1i1p1_19500101-19541231.nc user_cache/username/historical/day/atmos/day/r1i1p1/v20120907/rsds/rsds_day_CMCC-CESM_historical_r1i1p1_19500101-19541231.nc user_cache/username/historical/day/atmos/day/r1i1p1/v20120907/prc/prc_day_CMCC-CESM_historical_r1i1p1_19500101-19541231.nc File names are given relative to the user_cache/ directory. To list the full file path use the -f list option:\nxfc list -f To predict when the files will be deleted, if no other files are added to the user area, and none of the current files are removed: xfc predict xfc predict Quota is predicted to be exceeded on 21 Aug 2019 14:58 by 252.1 GB Files predicted to be deleted user_cache/username/historical/.ftpaccess user_cache/username/historical/00README_catalogue_and_licence.txt user_cache/username/historical/day/atmos/day/r1i1p1/COPY_CURRENT_20150326.txt Example of initial use \u0026nbsp; Below is a list of commands the user might use in their initial session with XFC.\ninitial setup \u0026nbsp; xfc init xfc path xfc email --email=user.name@email.com xfc notify query the quota \u0026nbsp; xfc quota xfc predict xfc schedule"
      })
      .add(
      
      
      {
        id: 116,
        tag: "en",
        href: "/docs/interactive-computing/transfer-servers/",
        title: "Transfer servers",
        description: "Transfer servers",
        
        
        content: "This article lists the JASMIN data transfer servers and provides links to how they can be used.\nJASMIN provides specific servers for managing data transfers. These are:\nServer Purpose Access requirements Further information xfer1.jasmin.ac.uk Virtual machine for general purpose data transfers. jasmin-login Visible on optical network connections from k9.leeds.ac.uk and some Met Office hosts. xfer2.jasmin.ac.uk Virtual machine for general purpose data transfers. jasmin-login xfer3.jasmin.ac.uk As per xfer[12], but with config like login2for enabling access from IP addresses without fwd/rev DNS lookup. jasmin-login AND xfer-sp Apply for additional access role access here. See below for further specifics. hpxfer1.jasmin.ac.uk Physical machine for high-performance data transfers. jasmin-login AND hpxfer IP address of client Tuned for UK \u0026amp; European network paths. Apply for additional access role accesshere hpxfer2.jasmin.ac.uk Physical machine for high-performance data transfers. jasmin-login AND hpxfer. IP address of client Tuned for long (intercontinental) network paths (e.g. UK - Australia). Apply for additional access role access here gridftp1.jasmin.ac.uk Physical machine for high-performance GridFTP transfers. jasmin-login AND hpxfer IP address of client No SSH login access. Apply for additional access role access here Acts as Globus Online endpoint \u0026quot; JASMIN GridFTP Server\u0026quot; Please see further articles in the Data Transfer category for details on managing your data transfers.\nThe standard transfer servers provide a basic and functional service for moving small amounts of data over relatively short distances. However, the high-performance data transfer servers shown above are also available for those with particular requirements. Users with login accounts can apply for access to use the high-performance servers.\n\u0026nbsp; Please make sure you use the dedicated transfer servers and not the scientific analysis or login servers for any significant data transfers. The transfer servers have been configured to achieve the best transfer rates and will perform significantly better than other servers on jasmin, while maintaining the performance of analysis servers for interactive use by other users. Special transfer machine xfer3.jasmin.ac.uk \u0026nbsp; This machine has been set up to cater for those whose network configuration does not enable them to connect to xfer1 and xfer2 (for example because of a lack of fwd/rev DNS lookup). A different set of access rules apply, which enables users to access this machine but a side effect of these additional rules is that repeated attempts to access the machine via SSH-based processes can result in being \u0026ldquo;locked out\u0026rdquo;. This may happen when attempting the transfer of several small files in quick succession with separate SSH connections for each. The \u0026ldquo;xfer-sp\u0026rdquo; access group is therefore a way of ensuring that the users accessing this machine know to be aware of this issue and can have their access to this machine denied if found to be causing a problem for the machine\u0026rsquo;s operation for other users.\n\u0026nbsp; Users are not permitted to execute commands which require administrative privileges. This applies to all hosts in the managed part of JASMIN where users have SSH login access (for example login, nx-login, sci, xfer and hpxfer machines). In other words, the use ofsu or sudo is not permitted. Please be careful when typing commands, particularly if you have multiple terminal windows open on your own computer, that you do not accidentally attempt sudoon a JASMIN machine: expect some follow-up from the JASMIN team if you do!"
      })
      .add(
      
      
      {
        id: 117,
        tag: "en",
        href: "/docs/data-transfer/transfers-from-archer2/",
        title: "Transfers from ARCHER2",
        description: "Transfers from ARCHER2",
        
        
        content: "This article explains how to transfer data between ARCHER2 and JASMIN. It covers:\nThe choice of available tools / routes Example of how to use the currently-recommended method Choice of available Tools/Routes \u0026nbsp; See Data Transfer Tools for general details.\nUsers transferring data between ARCHER2 and JASMIN are often transferring relatively large sets of data, so it is important to choose the most appropriate route, method and tools to ensure you get the most efficient and reliable transfer experience. This can vary depending on system and network conditions.\nIf you want to try all the options available, you will need:\nhpxfer (high-performance data transfer) access role on JASMIN, in addition to the jasmin-login role. a login account at ARCHER2 (only for certificate-based GridFTP) to have registered the subject of your JASMIN-issued short-term credential with ARCHER2 support. Check the examples in the linked documentation articles and ensure that you use them between the hosts used in the examples. Not all services connect over all routes to/from all hosts!\nNOTE:\nEnquiries about access to or use of ARCHER2 should be directed to ARCHER2 support (support@archer2.ac.uk) Enquiries about access to or use of JASMIN should be directed to JASMIN support (use beacon, below-right or support@jasmin.ac.uk) Available transfer methods \u0026nbsp; Basic SSH transfer \u0026nbsp; scp/rsync/sftp: Simple transfers using easy method, pushing data to general purpose xfer nodes. Convenient, but limited performance.\nsource dest notes login.archer2.ac.uk xfer1.jasmin.ac.uk over 10G JANET, but to virtual machine at JASMIN end login.archer2.ac.uk xfer2.jasmin.ac.uk same GridFTP over SSH \u0026nbsp; GridFTP over SSH: GridFTP performance with convenience of SSH. Requires persistent ssh agent on local machine where you have your JASMIN key. 2nd choice method\nsource dest notes login.archer2.ac.uk hpxfer1.jasmin.ac.uk over 10G JANET login.archer2.ac.uk hpxfer2.jasmin.ac.uk over 10G JANET\nhpxfer2 is configured for longer distances but can be useful if hpxfer1 is busy GridFTP using certificate auth \u0026nbsp; GridFTP using certificate auth: Fully-featured GridFTP. Suitable for person-not-present transfers \u0026amp; long- running ARCHER2 workflows. 1st choice method\nsource dest notes login.archer2.ac.uk gridftp1.jasmin.ac.uk over 10G JANET.\nDedicated GridFTP server.\nNo need for persistent SSH agent at ARCHER2 end 1st choice method: example \u0026nbsp; The currently-recommended method for transfers between ARCHER2 and JASMIN is using globus-url-copy with the concurrency option, as described below, but using certificate-based authentication rather than SSH. This will work for person- not-present transfers, so is suitable for long-running processes on ARCHER2 which need to spawn a transfer to JASMIN at intervals up to a month from initiation.\n1. Load your SSH key for ARCHER2 on your local machine, then log in to ARCHER2.\nThis method does not require you to use your JASMIN SSH key. It involves:\nobtaining tools to communicate with JASMIN\u0026rsquo;s short-lived credentials service using the service to obtain a credential (it should last for 30 days, but a new one can be obtained at any time) using the credential to initiate a transfer (this what you would need to repeat for each transfer) A fuller explanation of the process is given in this document:\nData Transfer Tools: GridFTP (certificate-based authentication) Once you have done these steps, you should be able to obtain a short-term credential as follows (do this command at the ARCHER2 end, after having downloaded the onlineca script as described in the document mentioned above):\n./onlineca-get-cert-wget.sh -U https://slcs.jasmin.ac.uk/certificate/ -l USERNAME -o ./cred.jasmin chmod 600 cred.jasmin Note that the path ./ is used for the script onlineca-get-cert-wget.sh, but you should use the path to wherever you saved it. Alternatively, if you make yourself a bin directory and add that to your PATH, then you don\u0026rsquo;t need to specify the path.\n2. Load the gct module (to make the current globus-url-copy command available in your path on ARCHER2).\nOnce loaded, check with which to see that you have the globus-url-copy command available to you.\nmodule load gct which globus-url-copy /work/y07/shared/gct/v6.2.20201212/bin/globus-url-copy 3. Transfer a single file to your home directory on JASMIN (limited space, but to check things work)\nglobus-url-copy -vb -cred cred.jasmin SRC/FILE gsiftp://gridftp1.jasmin.ac.uk/DEST/FILE Note that we specify the credentials file cred.jasmin and use the protocol gsiftp:// with no need to specify the username in the connection string (we\u0026rsquo;ve used the path /~/ to signify \u0026ldquo;my home directory\u0026rdquo; as the destination path). Note also that the hostname in this case, gridftp1.jasmin.ac.uk is a host that you can ONLY connect to directly using gsiftp: it does not permit SSH connections.\nIn all other aspects, the transfer is the same as for the SSH method (see \u0026ldquo;2nd choice method\u0026rdquo; below), so the commands below are very similar: we\u0026rsquo;re just using the gsiftp method instead of sshftp (both are ways of using the gridftp transfer protocol)\n4. Recursively transfer a directory of files, using the concurrency option for multiple parallel transfers\nglobus-url-copy -vb -cd -r -cc 4 -cred cred.jasmin SRC/DATA/ gsiftp://gridftp1.jasmin.ac.uk/DEST/DATA/ NOTE: The -cc option initiates the parallel transfer of several files at a time, which achieves good overall transfer rates for recursive directory transfers. This is different from using the -p N -fast options which use parallel network streams to parallelism the transfer of each file.\nThe -p N -fast options (for parallel-streamed transfers) are not currently working to all JASMIN storage locations, so use at your own risk until further notice. The transfer should work OK out of ARCHER2 (check by writing a single file to /dev/null at the JASMIN end) but currently will not work properly when writing to the SOF storage (/gws/nopw/j04 or /gws/nopw/j07, or /work/xfc/vol[1-3], though other paths should work OK). This is a known issue at the JASMIN end, thought to be related to network configuration, which is still under investigation. Single-stream transfers (omitting the -p N -fast options) should work fine.\nHere, the options used are (see man globus-url-copy for full details):\n-vb | -verbose-perf During the transfer, display the number of bytes transferred and the transfer rate per second. Show urls being transferred -concurrency | -cc Number of concurrent ftp connections to use for multiple transfers. -cd | -create-dest Create destination directory if needed -r | -recurse Copy files in subdirectoriesExperiment with different concurrency options (4 is a good start, more than 16 would start to \u0026ldquo;hog\u0026rdquo; resources so please consider\n5. Use the sync option to synchronise 2 directories between source and target file systems:\nglobus-url-copy -vb -cd -r -cc 4 -sync -cred cred.jasmin SRC/DATA/ gsiftp://gridftp1.jasmin.ac.uk/DEST/DATA/ where SRC/DATA/ and /DEST/DATA/ are source and destination paths, respectively (include trailing slash).\nOptions are as before but with:\n-sync Only transfer files where the destination does not exist or differs from the source. -sync-level controls how to determine if files differNote that the default sync level is 2, see level descriptions below, which only compares time stamps. If you want to include a file integrity check using checksums, you need to use-sync-level 3 but there may be a performance cost.\n-sync-level Choose criteria for determining if files differ when performing a sync transfer. Level 0 will only transfer if the destination does not exist. Level 1 will transfer if the size of the destination does not match the size of the source. Level 2 will transfer if the timestamp of the destination is older than the timestamp of the source, or the sizes do not match. Level 3 will perform a checksum of the source and destination and transfer if the checksums do not match, or the sizes do not match. The default sync level is 2.So a full sync including comparison of checksums would be:\nglobus-url-copy -vb -cd -r -cc 4 -sync -sync-level 3 -cred cred.jasmin src/data/ gsiftp://gridftp1.jasmin.ac.uk/path/dest/data/ 2nd choice method: example \u0026nbsp; The next-best method for transfers between ARCHER2 and JASMIN is using globus- url-copy with SSH authentication, as described below:\n1. Load your SSH keys for both JASMIN and ARCHER2 on your local machine, then log in to ARCHER2.\nYou will need to have loaded into your SSH agent:\nThe SSH key associated with your JASMIN account The SSH key associated with your ARCHER2 account, if you have one (it is recommended to use a different one than for JASMIN, if so) You also need to ensure that you connect with the -A option for agent forwarding, to enable the JASMIN key to be available for the onward authentication with the JASMIN server.\nNote that you do not (and should not) copy your JASMIN private key to ARCHER2. It should stay on your local machine. This does mean that you need an ssh- agent running on your local machine, so this method may not work for long- running continuous processes that need to spawn transfers.\nssh-add \u0026lt;jasmin ssh key\u0026gt; (path to your JASMIN ssh key file on your local machine) ssh-add \u0026lt;archer2 ssh key\u0026gt; (path to your ARCHER2 ssh key if you have one, on on your local machine) ssh-add -l check both keys are loaded (are both key signatures listed in the output?) ssh -A \u0026lt;archer2-username\u0026gt;@login.archer2.ac.uk #(ARCHER2 now uses multi-factor auth at this stage) 2. Load the gct module (to make the current globus-url-copy command available in the path)\nmodule load gct which globus-url-copy /work/y07/shared/gct/v6.2.20201212/bin/globus-url-copy 3. Transfer a single file to your home directory on JASMIN (limited space, but to check things work)\nglobus-url-copy -vb \u0026lt;file\u0026gt; sshftp://\u0026lt;jasmin-username\u0026gt;@hpxfer1.jasmin.ac.uk/~/\u0026lt;file\u0026gt; Obviously, replace \u0026lt;file\u0026gt; with the path to the file you want to transfer.\nFrom here on, the commands are the same as described above in the \u0026ldquo;1st choice method\u0026rdquo; but simply replace\n-cred cred.jasmin gsiftp://gridftp1.jasmin.ac.ukwith\nsshftp://\u0026lt;jasmin-username\u0026gt;@hpxfer1.jasmin.ac.uk"
      })
      .add(
      
      
      {
        id: 118,
        tag: "en",
        href: "/docs/getting-started/understanding-new-jasmin-storage/",
        title: "Understanding new JASMIN storage",
        description: "Understanding new JASMIN storage",
        
        
        content: "\u0026nbsp; This article was originally written in 2018/19 to introduce new forms of storage which were brought into production at that stage. Some of the information and terminology is now out of date, pending further review of JASMIN documentation. Introduction \u0026nbsp; JASMIN continues to grow as a unique collaborative analysis environment for an expanding community of scientists. Some of the big challenges we attempted to address with Phase 4 were the ever-growing demand for storage space and the increasing diversity of scientific workflows. However, we’re aware that some aspects of the changes introduced in Phase 4 have presented some challenges in themselves. Here, we outline the reasons for the changes and try to summarise some of the challenges and what can be done to help deal with them.\nBackground \u0026nbsp; (skip this if you just want to go straight to the advice):\nWith phase 4 we knew we had to both replace existing storage that had become uneconomic to maintain, and add significantly more volume! However, we also knew that most of the data stored on JASMIN disk is not touched for months on end, but that some data is heavily used. We also knew that the traditional way of building disk systems was no longer suitable for the scales (volumes of data) we needed to handle, being supplanted by new technologies, and that at some point our community would have to get used to these new technologies too. The solution we chose for JASMIN is the same solution being deployed at most large HPC sites: deploying tiered storage, that is more types of storage, and requiring you, the user, to use the right kind of storage in the right place in your workflow!\nUnderstanding the four types of JASMIN disk: \u0026nbsp; We have settled on four kinds of disk storage - quite an increase from the one we had previously! Each is best for one kind of workflow, although each “can do” most things, although not always well. We will see below that there is one kind of activity that we now need to be much more careful about, because doing it not only causes problems for individuals, but also for everyone else. We could stop allowing this to happen, but it would be at a performance penalty which would occur all the time: we have gone for “better with occasional really slow” in preference to “always predictably slow” performance. What we need you to do is learn how to avoid creating the “occasionally really slow” times!\nThe four types are:\nSolid state fast but not parallel disk (SSD), really suitable for small files. This is what is used for your /home/users directories, so is good for things you really don’t want to lose, because this area is backed up. The same type of storage is also used for the scratch area /work/scratch-nopw, although this is NOT for persistent storage and is NOT backed up. SSD is great for compiling and storing millions of small files, but is the most expensive storage, so we don’t have a lot of it. Fast parallel disk (PFS) , great for jobs that read and write the same file from many different processes. This is what we had before. It’s not so great for lots of small files. This is still pretty expensive, which is one of the reasons why we haven’t simply stayed with it. Some GWS still use this, but most are migrating to the next category - scale-out file storage. Scale Out File Storage (SOF). This is what most of our Group Workspaces (GWS) will use. This is great for large volumes of data with regular use (consider near-line tape storage if you don’t need access for a significant period). SOF is not so great for small files, so if you have lots of small files, best to either aggregate them or tar them up. This is terrible for parallel write access to files, and you must avoid that. More details on that below, but the key point is you might find you need to use the fast parallel scratch (currently /work/scratch) in your workflows as an intermediary between persisting your data and your Lotus batch jobs. High Performance Object Storage (HPOS). This is a new type of storage, and it’s best if you are working with the cloud. It’s going to be a bit tricky to get the hang of, so pay attention to the various things we’re going to be saying over the next few months about how to use it. It is the future though\u0026hellip; What type of storage am I using? \u0026nbsp; Storage Type Parallel-write Good for small files? Backed up? /home/users SSD no yes e.g. Installing Conda yes /gws/pw/j07/* PFS yes no no /gws/nopw/j04/* SOF no no no /gws/smf/j04/* SSD no yes yes /work/scratch-pw[23] PFS yes no no /work/scratch-nopw2 SSD no yes no /work/xfc/volX SOF no no no Automounted SOF storage: GWS storage volumes /gws/nopw/j04/* are automounted. This means that a particular GWS volume is not mounted by a particular host until the moment it is first accessed. If the volume you are expecting to see is not listed at the top level ( /gws/nopw/j04/) you should use the full path of the volume to access it, and after a very short delay, the volume should appear.\nSee also here to see where these are mounted throughout JASMIN.\nThe BIG issue: why you need to be careful about parallel file access \u0026nbsp; (even if you don’t think you are doing it):\nTraditional disk systems try and do cunning things when different processes are writing to the same file; they can lock the file so only one process can have a turn at a time, or they can try and stack up the updates and do them one after another (and hope they don’t interfere), but at scale, all those tricks come with a performance cost. That cost gets paid in many ways: raw I/O speed, how many extra copies of blocks get written, how long it takes to rebuild if things go wrong, how big any part of the storage can be… and, how much kit and software the vendors need to deliver to make it work. All that cost is worth it if your workflow needs it (and can’t avoid it), but in the JASMIN environment, not many workflows actually need it.\nOur fast parallel disk is fine for those workflows, but none of the others support it well, and in particular for our scale-out file storage, as used by most GWSs, the way it works means that if we turn on the support for parallel write, it will become much slower and write many more copies of some data blocks, meaning it will do I/O slower, and it will store less! Not what we want. The parallel read is fine! However, avoiding parallel writes has turned out to be harder than we anticipated, your workflows have many more ways of doing it than we thought! Sadly, when you do parallel writes, the file system can get “stuck” and that’s when everything goes really slow, for everyone on that host …\nOne way around this is for us to apply “global write locking” to a GWS volume (your GWS manager would need to request this). This solves the problem by preventing parallel writes altogether, but at a significant cost in performance.\nFAQs, issues and solutions \u0026nbsp; Please read our collection of FAQs and known issues (and solutions!) which we\u0026rsquo;ve put together HERE."
      })
      .add(
      
      
      {
        id: 119,
        tag: "en",
        href: "/docs/getting-started/update-a-jasmin-account/",
        title: "Update a JASMIN account",
        description: "Update a JASMIN account",
        
        
        content: "This article shows you how to update an active JASMIN account on the JASMIN accounts portal.\nUpdate info \u0026nbsp; Step 1 : On your profile page\u0026nbsp; , select \u0026ldquo;Update info\u0026rdquo;.\nUpdate detils Step 2 : Once the discipline and degree are updated, click \u0026ldquo;Update profile\u0026rdquo;\nUpdate details Step 3 : The updated details are displayed.\nUpdated profile Update SSH public key \u0026nbsp; To update your SSH public key, first you need to generate a new SSH key pair as described here: Generate an SSH key pair. This should be done on your local machine (e.g. Windows / Linux / Mac). You MUST protect your key with a strong passphrase. Then follow step 1 to step 5 to update your SSH public key. You will be asked for a verification token during this process. The system will reject any key that it recognises has been used before (across all users) so you must generate a fresh key each time: you cannot recycle an old key.\nStep 1 : On the profile page, select \u0026ldquo;Update key\u0026rdquo;\nUpdate key Step 3 On the profile page shown above select \u0026ldquo;Update key\u0026rdquo;. Within a few seconds, you should receive a validation token to your registered email address.\nStep 4: Enter the validation token, delete the old SSH public key , and paste the new SSH public key. Click \u0026ldquo;Update SSH key\u0026rdquo;.\nConfirmation Step 5: Confirmation is displayed. Please allow 15 minutes before attempting to log in again, while the new key becomes active on the JASMIN system.\nIf you get the message \u0026ldquo;not a valid ssh public key\u0026rdquo; please check that you have copied the text from the .pub file and that no newline characters are included: the public key should be a single line of text. It can be difficult to see this as the text automatically wraps itself to fit in the text box.\nKey updated Change password \u0026nbsp; Step 1 : Go to your username in the top-right corner of the navigation bar. Select \u0026ldquo;Change password\u0026rdquo; from the drop-down menu.\nSelect change password from menu Step 2 : Enter the new password which must conform to the rules stated. You should ideally generate a strongly random string in an encrypted password manager and store it securely. Make sure it is NOT the same as your SSH key passphrase. Re-enter the new password to confirm, then click \u0026ldquo;Change password\u0026rdquo;\nSubmit new password Link CEDA account \u0026nbsp; Linking your CEDA account to your JASMIN account allows you filesystem access to data on CEDA Archive. If you need to access data on the CEDA Archive and you do not have an account, you will need to apply for a CEDA account.\nStep 1 : On the profile page, select \u0026ldquo;Link now\u0026rdquo; which is opposite to the field \u0026ldquo;Linked CEDA Account\u0026rdquo;. This will take you to the CEDA accounts portal page where you need to login.\nLogin to your CEDA account Step 2 : You will be directed to the page below to authorise JASMIN accounts portal to link your CEDA account and read CEDA profile information.\nAllow access Step 3 : Your \u0026ldquo;Linked CEDA Account\u0026rdquo; field on your JASMIN account profile page will be updated with \u0026ldquo;Linked with \u0026lt;JASMIN username\u0026gt;\u0026rdquo; as shown below\nUpdated JASMIN account"
      })
      .add(
      
      
      {
        id: 120,
        tag: "en",
        href: "/docs/workflow-management/using-cron/",
        title: "Using Cron",
        description: "Using Cron",
        
        
        content: "Cron is a very common job scheduler for linux. It allows users to run the same command or shell script periodically. Typically it is used to automate tasks, for example, every Monday run my script to plot last week\u0026rsquo;s data. There are many guides to using cron and crontab (the command for loading the cron job table).\nCron on JASMIN \u0026nbsp; Generally cron is disabled on the JASMIN general access machines such as sci1.jasmin.ac.uk. This is to avoid people killing the machine by setting up lots of processing jobs when better alternatives, e.g. Lotus, are available. However, there are times when it is appropriate to use cron and so a generic cron service machine is provided. cron.jasmin.ac.uk is configured like sci*.jasmin.ac.uk, except cron is enabled. Anyone who can log into sci* should also be able to login to cron.jasmin.ac.uk. (the actual hostname of the machine is cron1.ceda.ac.uk but please refer to it as cron.jasmin.ac.uk wherever possible).\nAn additional transfer server xfer3.jasmin.ac.uk is equipped with cron for scheduling transfers only (no processing), although other methods for scheduling/automating transfers are available.\nThere are a few rules of the road to using this service:\nAvoid process pile up : If a job has not finished before the cron starts the next instance of the same job then competition for resources probably means that job will also not finish. Eventually a mass of unfinished jobs will overwhelm the whole machine and it will crash. To avoid this jobs should test to see if the previous job is still running by using a lock file, or making sure the jobs timeout. The crontamer wrapper script, documented below, is available to help you implement this. Expect it to break occasionally : Regardless of any measure introduced by users to stop process pile up, you can expect it to go rouge at some point. We will reboot the machine when this happens, probably without warning. We may remove offending jobs from the cron table but persistent offenders may be barred from using the service. Don\u0026rsquo;t do heavy processing or data transfers on the cron machine itself. You can submit jobs to lotus (sbatch is on cron1.ceda.ac.uk) to offload the processing resource. Common Cron Gotchas \u0026nbsp; The bash shell environment when cron launches scripts is not identical to the one when working interactively. Annoyingly the path to common tools, like sbatch, may not have been setup so that you get an error message from cron when it works perfectly well interactively. A way to get round this is to source the .bash_profile in the crontab file so that the interactive environment is used by cron.\n24 * * * * . $HOME/.bash_profile; sbatch -W 12:0 mycmd.sh Crontamer \u0026nbsp; Crontamer is a wrapper script to implement lock file and time out checking for cron jobs to avoid issues of ‘’’runaway’’’ jobs causing problems for everyone (e.g. where new jobs start before old ones finish, which can cause a snowball effect).\nYou can download the crontamer script from https://github.com/cedadev/crontamer. It is already installed on cron1.ceda.ac.uk\nUse cron as normal, but include the crontamer command before the users own script and arguments.\ncrontab -l ## e.g. cron file entry to run job every day at 4am: 0 4 * * * crontamer -t 2h \u0026#39;/home/users/jblogs/bin/my_repeat_script.sh -opt1 arg1 arg2\u0026#39; Note: Crontamer has a number of options which can be conflated with the options for the wrapped script. Use single quotes to make sure the script runs with the right options.\nThe flow of the crontamer script is like this:\nCheck for existing lock file to indicate if the script is already running. If the lockfile is there and it can see the matching process still running then it exits silently. If the lock file is not there or it can\u0026rsquo;t see the matching process on the system then it starts the wrapped script. Periodically check the wrapped script is running. If the script fails, with a non-zero exit return code, then it can email you. If the script has been running longer than specified timeout (default 12hr) then it will be killed. Unless a named lock file is given the lock files are created in the /tmp directory as\n/tmp/crontamer.unique_idThese files should be cleaned up automatically, but users may need occasional checks or find them helpful for identifying problems running their scripts. The unique_id is based on a combination of the username, passed script and arguments, enabling multiple calls of a script with different arguments to be handled separately.\nAll the principles above apply whether using cron on:\nthe cron server cron.jasmin.ac.uk (for initiating processing workflows) the transfer server xfer3.jasmin.ac.uk (for initiating automated transfers)"
      })
      .add(
      
      
      {
        id: 121,
        tag: "en",
        href: "/docs/software-on-jasmin/matplotlib/",
        title: "Using Matplotlib for visualisation on JASMIN",
        description: "Using Matplotlib for visualisation on JASMIN",
        
        
        content: "This article provides a basic example of using Matplotlib on JASMIN to generate a plot. It also gives an important tip that may stop your code failing when run on the LOTUS cluster.\nMatplotlib - a basic example \u0026nbsp; Matplotlib is a very well documented plotting library for Python. Here is a brief example of generating a line graph on a PNG file using matplotlib.\nLoad the Jaspy Python 3 environment, and start a Python session:\nmodule load jaspy python In python, set some x-values, y-values, axis labels and a title, and plot:\nimport matplotlib matplotlib.use(\u0026#39;agg\u0026#39;) import matplotlib.pyplot as plt x_values = [1, 5, 3, 9, 14] y_values = [2000, 2005, 2010, 2015, 2020] x_label = \u0026#39;Temperature (degC)\u0026#39; y_label = \u0026#39;Year\u0026#39; title = \u0026#39;Average temperature of garden shed (2000-2020)\u0026#39; plt.plot(y_values, x_values, \u0026#39;g--\u0026#39;) plt.ylabel(y_label) plt.xlabel(x_label) plt.title(title) plt.savefig(\u0026#39;output.png\u0026#39;) Plotting with matplotlib on LOTUS \u0026nbsp; When using matplotlib on LOTUS hosts please make sure that you are setting the rendering backend to a setting that will definitely work. This must be done before importing matplotlib.pyplot.\nOn JASMIN it is safe to use:\nimport matplotlib matplotlib.use(\u0026#39;agg\u0026#39;) import matplotlib.pyplot as pltor alternatively, the MPLBACKEND environment variable can be set in the job script before invoking python:\nexport MPLBACKEND=aggIf you do not set this option or you choose an alternative backend then you may see failures which include very large dump (error) files being written (up to 56GB per file!). Please remove these files if you accidentally create them, and switch over to selecting an appropriate rendering backend as indicated above.\nNote that if you see the following error message, this results from attempting to use the default GTK backend on LOTUS (as GTK is only available in an interactive X-windows environment). The solution is to use agg, as described above.\nValueError: Namespace Gtk not available for version 3.0 For more information please see the matplotlib back-ends page."
      })
      .add(
      
      
      {
        id: 122,
        tag: "en",
        href: "/docs/short-term-project-storage/using-the-jasmin-object-store/",
        title: "Using the JASMIN Object Store",
        description: "Using the JASMIN Object Store",
        
        
        content: "This article describes how to use the JASMIN high-performance object storage.\nWhat is object storage? \u0026nbsp; An object store is a data storage system that manages data as objects referenced by a globally unique identifier, with attached metadata. This is a fundamental change from traditional file systems that you may be used to, as there is no directory hierarchy - the objects exist in a single flat domain. These semantics allow the object store to scale out much more easily than a traditional shared file system.\nThe other fundamental change is that the data is no longer accessed by mounting a file system onto a host and referencing a file path (where authentication is \u0026ldquo;can I log in to the host\u0026rdquo;). Instead, the data is accessed over HTTP, with authentication using HTTP headers. This has many benefits, the biggest of which is that we can make the object store available outside of the JASMIN firewall, for example to the JASMIN External Cloud. Data can be read and written in the same way, using the same tools, from inside and outside JASMIN. Contrast this with Group Workspaces, where you must be logged in to a JASMIN host in order to write data using the file system, and data is only accessible externally in a readonly way using HTTP or OPeNDAP or via data transfer methods.\nObject stores are seen as the most efficient (and cheapest!) way to store and access data from the cloud, and all the major cloud providers support some variant of object store. The JASMIN object store is S3 compatible - S3 is the object store for Amazon Web Services (AWS), and has become a de- facto standard interface for object stores. This means that all the same tools that work with AWS S3 will also work with the JASMIN object store.\nAccessing the object store \u0026nbsp; The JASMIN object store is organised into tenancies. These are shared areas of the object store, similar in concept to Group Workspaces, and are requested by users, usually Group Workspace Managers. Several users can have access to a tenancy, and so they can be used collaboratively.\nTo join an existing object store tenancy, navigate to the \u0026ldquo;Services\u0026rdquo; section in the JASMIN Accounts Portal and select the \u0026ldquo;Object store\u0026rdquo; category. Select a tenancy and submit a request to join. This request will then be considered by the manager of the tenancy and either accepted or rejected.\nFor details on how to request and manage an object store tenancy, please see the help article \u0026ldquo;JASMIN Object Store for Managers\u0026rdquo; (forthcoming).\nDefault access policies \u0026nbsp; As of Jan 2024, we have changed the default access policy for newly created tenancies to provide a more sensible and flexible set of access policies.\nThe old policy allowed any members of the tenancy access to any bucket created in the tenancy by default. The new policy allow Users (USER only in the JASMIN Accounts Portal) of the tenancy only access to buckets they own by default. This can be effectively changed to the old policy by setting the policy of the bucket to the LDAP group for the tenancy members (-members, e.g. cedadev-o-members) - this can be done using the JASMIN Object Store portal (below) or the Swarm portal. Specific JASMIN users or groups can also be given permission to buckets (group access is controlled by LDAP groups, and only existing LDAP group will work - you may need to ask for one to be created).\nThe new policy also gives admin access for tenancy MANAGER and DEPUTY roles, who have access to all the buckets in the tenancy.\nCreating an access key and secret \u0026nbsp; Authentication with the object store uses an access key and secret that are separate to your JASMIN username and password. You can generate keys and manage bucket permissions through the JASMIN Object Store Portal.\u0026nbsp; JASMIN sbject store portal You can log in with your JASMIN username and password. You can then click on the \u0026ldquo;Object Stores\u0026rdquo; button on the right. This will present you with the list of object store tenancies that you have access to. If you don\u0026rsquo;t see an object store tenancy that you expect to, please check you have access in the JASMIN Accounts Portal\u0026nbsp; . If you have access in the Accounts Portal, but not in the Object Store Portal then please email the helpdesk.\nList of object store tenancies The URL for the object store tenancy is also presented here for convenience. You can click on the \u0026ldquo;Manage Object Store\u0026rdquo; button to manage you keys and buckets. This will ask you to confirm your JASMIN password.\nPrompt for password You will then be presented with the following page.\nexisting keys From this page you can view your existing keys, and delete them if you require. You can also use the \u0026ldquo;Create Key\u0026rdquo; tab on the left.\nCreate access key You need to name the key and enter an expiry date for it. This will then present you with a pop-up with details on your access key and secret key. This is the only time your secret key will visible, so save it immediately in a secure password manager.\nManaging bucket permissions \u0026nbsp; You can also manage the permissions on buckets using the \u0026ldquo;Buckets\u0026rdquo; tab from this page. This allows you to manage the access policies for your buckets without using the S3 API or the Swarm portal.\nBucket permissions Click on the \u0026ldquo;Manage permissions\u0026rdquo; button for a bucket to add or change access policies for that bucket.\nGranting access By default this lets you grant access to specific JASMIN Users and/or groups (these are LDAP groups and you might need to request that one is created for you if you require a subgroup for your tenancy). The advanced tab gives you the same options as available through the Swarm portal - including making buckets publicly accessible. Once done, hit the save to add the policy to the bucket. You can edit or delete permissions from that bucket through the \u0026ldquo;View Bucket Policies\u0026rdquo; tab.\nLegacy method for key creation \u0026nbsp; This is the old way of creating keys which still works, but the new way above is accessible outside JASMIN on the public internet.\nYou can generate an access key and secret using the Caringo portal.\nAuthentication with the object store uses an access key and secret that are separate to your JASMIN username and password. You can generate an access key and secret using the Caringo portal. This portal is not currently available outside of JASMIN - you will need to use a graphical session on JASMIN to access a Firefox browser running on a JASMIN system.\nThe recommended way to do this is using the NX Graphical Desktop service. You can start Firefox from the \u0026ldquo;Activities\u0026rdquo; menu once you have logged in to your graphical desktop on one of the nx-login* servers (so no need to make an onward connection to a sci server).\nAn alternative option is to using X11 Forwarding on your SSH connection:\nssh -AY \u0026lt;user\u0026gt;@sciX.jasmin.ac.uk firefoxOnce you have Firefox open, navigate to\nhttp://my-os-tenancy-o.s3.jc.rl.ac.uk:81/_admin/portalbut replace my-os-tenancy-o with your tenancy name.\nYou will see a login screen where you should enter your JASMIN username and password:\nIf you receive a \u0026ldquo;HTTP ERROR 500 java\u0026hellip;\u0026rdquo; error, it is likely that you haven\u0026rsquo;t added the port (81) to the address.\nUpon successfully entering the username and password of a user who belongs to the tenancy, you will see a dashboard. To create an access key and secret, click on the cog icon and select \u0026ldquo;Tokens\u0026rdquo;:\nOn the tokens page, click \u0026ldquo;Add\u0026rdquo;:\nIn the dialogue that pops up, enter a description for the token and set an expiration date. Make sure to click \u0026ldquo;S3 Secret Key\u0026rdquo; - this will expose an additional field containing the secret key. Make sure you copy this and store it somewhere safe - you will not be able to see it again! This value will be used whenever the \u0026ldquo;S3 secret key\u0026rdquo; is required.\nOnce the token is created, it will appear in the list. The \u0026ldquo;Token\u0026rdquo; should be used whenever the \u0026ldquo;S3 access key\u0026rdquo; is required:\nAccessing data in the object store \u0026nbsp; URLs for internal and external access \u0026nbsp; Although the data is exactly the same in both cases, a slightly different URL must be used depending on whether you are accessing the object store from the JASMIN managed cloud servers or from the JASMIN External Cloud.\nFrom inside JASMIN, including LOTUS and the Scientific Analysis servers, my-os-tenancy-o.s3.jc.rl.ac.uk should be used, with the `http://`` prefix.\nFrom the JASMIN External Cloud, and from locations external to JASMIN, my-os-tenancy-o.s3-ext.jc.rl.ac.uk should be used - note the https:// prefix and additional -ext.\n(Where my-os-tenancy-o needs to be replaced with your tenancy name)\nUsing s3cmd \u0026nbsp; s3cmd is a command line tool provided by Amazon to work with S3 compatible Object Storage. It is installed on JASMIN, both on the sci-machines and on LOTUS. It is a little more complicated to use than the MinIO client, but is more powerful and flexible. For full details on s3cmd, see the s3tools.org website.\nTo configure s3cmd to use the JASMIN object store, you need to create and edit a ~/.s3cfg file. To access the my-os-tenancy-o tenancy (where \u0026ldquo;my-os- tenancy-o\u0026rdquo; needs to be replaced with your tenancy name), the following should be in the ~/.s3cfg file:\naccess_key = \u0026lt;access key generated above\u0026gt; host_base = my-os-tenancy-o.s3.jc.rl.ac.uk host_bucket = my-os-tenancy-o.s3.jc.rl.ac.uk secret_key = \u0026lt;secret key generated above\u0026gt; use_https = False signature_v2 = Falseor, from an external tenancy or locations outside of JASMIN:\naccess_key = \u0026lt;access key generated above\u0026gt; host_base = my-os-tenancy-o.s3-ext.jc.rl.ac.uk host_bucket = my-os-tenancy-o.s3-ext.jc.rl.ac.uk secret_key = \u0026lt;secret key generated above\u0026gt; use_https = True signature_v2 = FalseTo see which commands can be used with s3cmd, type:\ns3cmd -hTo list a tenancy\u0026rsquo;s buckets:\ns3cmd lsTo list the contents of a bucket:\ns3cmd ls s3://\u0026lt;bucket_name\u0026gt;Make a new bucket:\ns3cmd mb s3://\u0026lt;bucket_name\u0026gt;s3cmd uses PUT and GET nomenclature for copying files to and from the object store.\nTo copy a file to a bucket in the object store:\ns3cmd put \u0026lt;file name\u0026gt; s3://\u0026lt;bucket_name\u0026gt;To copy a file from a bucket in the object store to the file system:\ns3cmd get s3://\u0026lt;bucket_name\u0026gt;/\u0026lt;object_name\u0026gt; \u0026lt;file_name\u0026gt;For more commands and ways of using s3cmd, see the s3tools website.\nUsing the MinIO client \u0026nbsp; The MinIO Client is a command line tool to connect to object stores (among other types of file storage) and interface with it as you would with a UNIX filesystem. As such, many of the UNIX file management commands found in standard installations of the OS are found within this client ( ls, cat, cp, rm for example).\nThere are a number of ways to install this client as shown in the quickstart guide. Methods include: docker, Homebrew for macOS, wget for Linux and instructions for Windows. Follow these steps to get the client installed on the relevant system.\nMinIO Client is not installed on JASMIN, but users can download and install it to their own user space, following the instructions for \u0026ldquo;64-bit Intel\u0026rdquo; (linux- amd64) in the MinIO quickstart guide. Below is an example to install it into the bin directory in your user space\nmkdir ~/bin wget https://dl.min.io/client/mc/release/linux-amd64/mc ~/bin chmod u+x ~/bin/mcYou can then add the ~/bin directory to the PATH environment variable in your ~/.bashrc file to allow mc to be accessed from anywhere on JASMIN.\n# User specific aliases and functions PATH=$PATH:$HOME/binTo configure the client with the JASMIN object store, create an access key and secret as documented above and insert them into the command:\nmc config host add [ALIAS] [S3-ENDPOINT] [TOKEN] [S3 SECRET KEY]The ALIAS is the name you\u0026rsquo;ll reference the object store when using the client. To demonstrate, if the alias was set to \u0026ldquo;jasmin-store\u0026rdquo;, displaying a specific bucket in the object store would be done in the following way:\nmc ls jasmin-store/my-bucketThe commands available in the client are documented in the quickstart guide (linked above). Copying an object from one place to another is very similar to a UNIX filesystem:\nmc cp jasmin-store/my-bucket/object-1 jasmin-store/different-bucket/ From Python \u0026nbsp; One method of accessing the object store from Python is using s3fs. This library builds on botocore but abstracts a lot of the complexities away. There are three main types of object in this library: S3FileSystem, S3File and S3Map. The filesystem object is used to configure a connection to the object store. Note: it\u0026rsquo;s strongly recommended to store the endpoint, token and secret outside of the Python file, either using environment variables or an external file. This object can be used for lots of the operations which can be done MinIO:\nwith open(\u0026#39;jasmin_object_store_credentials.json\u0026#39;) as f: jasmin_store_credentials = json.load(f) jasmin_s3 = s3fs.S3FileSystem( anon=False, secret=jasmin_store_credentials[\u0026#39;secret\u0026#39;], key=jasmin_store_credentials[\u0026#39;token\u0026#39;], client_kwargs=\u0026#39;endpoint_url\u0026#39;: jasmin_store_credentials[\u0026#39;endpoint_url\u0026#39;] ) my_object_size = jasmin_s3.du(\u0026#39;my-bucket/object-1\u0026#39;)Please note in the example above, the jasmin_object_store_credentials.json file would look along the lines of:\n \u0026#34;token\u0026#34;: \u0026#34;\u0026lt;access key generated above\u0026gt;\u0026#34;, \u0026#34;secret\u0026#34;: \u0026#34;\u0026lt;secret key generated above\u0026gt;\u0026#34;, \u0026#34;endpoint_url\u0026#34;: \u0026#34;http://my-os-tenancy-o.s3.jc.rl.ac.uk\u0026#34; or, from an external tenancy or locations outside of JASMIN:\n \u0026#34;token\u0026#34;: \u0026#34;\u0026lt;access key generated above\u0026gt;\u0026#34;, \u0026#34;secret\u0026#34;: \u0026#34;\u0026lt;secret key generated above\u0026gt;\u0026#34;, \u0026#34;endpoint_url\u0026#34;: \u0026#34;https://my-os-tenancy-o.s3-ext.jc.rl.ac.uk\u0026#34; S3File is used for dealing with individual files on the object store within Python. These objects can read and written to and from the store:\nfile_object = s3fs.S3File(jasmin_s3, \u0026#39;my-bucket/object-1\u0026#39;, mode=\u0026#39;rb\u0026#39;) # refresh can be set to True to disable metadata caching file_metadata = file_object.metadata(refresh=False) # Writing data to variable in Python file_object.write(data) # Data will only be written to the object store if flush() is used. This can be executed in S3FS source code if the buffer \u0026gt;= the blocksize file_object.flush()S3Map is very useful when using xarray to open a number of data files (netCDF4 for example), and turn them into the zarr format ready to be stored as objects on the store. The function for this can store a .zarr file in a POSIX filesystem, or can be streamed directly to an object store. These datasets can then be opened back into Python:\nxarray.open_mfdataset(filepath_list, engine=netcdf4) s3_store = s3fs.S3Map(\u0026#39;my-bucket/zarr-data\u0026#39;, s3=jasmin_s3) dataset.to_zarr(store=s3_store, mode=\u0026#39;w\u0026#39;) # Reopening the dataset from object store using xarray xarray.open_zarr(s3_store, consolidated=True)"
      })
      .add(
      
      
      {
        id: 123,
        tag: "en",
        href: "/docs/short-term-project-storage/introduction-to-group-workspaces/",
        title: "What is a Group Workspace?",
        description: "What is a Group Workspace?",
        
        
        content: "Introduction \u0026nbsp; This article describes the way that storage is usually provided to projects on JASMIN: the Group Workspace (GWS).\nWhat is a GWS? \u0026nbsp; GWSs are portions of disk allocated for particular projects to manage themselves, enabling collaborating scientists to share network accessible storage on JASMIN. Users can pull data from external sites to a common cache, process and analyse their data, and where allowed, exploit data available from other GWSs and from the CEDA archive.\nIt is important to understand that these workspaces are not the same as the CEDA archive. Data in a GWS can be earmarked for ingestion into the CEDA archive, but this process should be discussed directly with the CEDA Archive team (via the CEDA Helpdesk), it is not automatic and will not happen without prior arrangement.\nData within GWSs are the responsibility of the designated GWS manager and are not backed up by the JASMIN team (see below).\nAccessing a GWS \u0026nbsp; Where are GWSs available? \u0026nbsp; Each GWS volume is found in a directory mounted under a pattern of paths which refers to the capabilities of the storage, ie.\nPath Type Capability /gws/nopw/j04/* SOF no parallel write (nopw) /gws/pw/j07/* PFS parallel write capable (pw) /gws/smf/j04/* SSD small-files optimised (smf) A project may have several GWS volumes, perhaps of different types, for example:\n/gws/nopw/j04/jules SOF volume for the jules project GWSs are available on:\nTransfer servers including xfer*, hpxfer*, gridftp* and the JASMIN Default Collection Globus endpoint. The general scientific analysis servers sci* All nodes in the LOTUS and ORCHID clusters Some application-specific servers (by arrangement) They are NOT available on login or nx-login servers.\nRequesting access to a GWS \u0026nbsp; There is a Unix group associated with each GWS to provide convenient access control. Any JASMIN user can apply for access to a given GWS by following the links provided in the list of available GWSs on the JASMIN Accounts Portal. Important: The GWS Manager (not the JASMIN team) will need to authorise the request before you are granted access.\nOnce you have been granted the relevant access role, then the relevant Unix group will be added to your account. If you are not sure of the group name for your GWS you can find this by entering the command groups to see the names of the groups you belong to. The group name normally has the prefix “gws_\u0026quot;.\n\u0026nbsp; All data in a GWS should belong to this group gws_\u0026lt;name\u0026gt;, so that group read/write permissions apply to this group rather than the default group, users. GWS management \u0026nbsp; Each GWS has a designated manager. See the article on managing a GWS.\nBackup \u0026nbsp; Please note that data in GWSs are only backed up if the GWS Manager has put tasks in place to do this. The Elastic Tape service is available to enable to make a secondary near-line copy of data. Please discuss the details with your GWS Manager.\nRecommended directory structure for a GWS \u0026nbsp; We recommend that a sensible directory structure is set up within your GWS in order to conventions are used within your GWS:\n\u0026lt;your_gws\u0026gt;/ users/ \u0026lt;userid\u0026gt;/ # each user can create their own directory here public/ # required if you want to share data via HTTP data/ internal/ # internal/intermediate data incoming/ # third-party data brought to the GWS output/ # output data generated by projectSee the GWS etiquette article for more details about GWSs and the GWS data sharing via HTTP article for information about the use of the public directory."
      })
      .add(
      
      
      {
        id: 124,
        tag: "en",
        href: "/docs/workflow-management/rose-cylc-on-jasmin/",
        title: "Workflow Management with rose/cylc",
        description: "Workflow Management with rose/cylc",
        
        
        content: "This page provides is an overview of Met Office tools (Rose, Cylc and FCM) that are installed on JASMIN for running and managing suites on the LOTUS cluster.\nIMPORTANT : Users of the JULES land surface model are advised to log into the Cylc server in order to launch the JULES suite.\nAbout rose/cylc \u0026nbsp; Rose and Cylc are very useful workflow management tools. You can:\nConfigure a Rose suite to work with the LOTUS batch cluster on JASMIN. Run a Rose suite and monitor its progress using the Cylc GUI. Find out more\nRose: https://metomi.github.io/rose/doc/html/ Cylc: https://cylc.github.io/doc/built-sphinx/ Getting started with rose/cylc\nThe tools are installed under the following common directory which is visible on all LOTUS nodes and the dedicated cylc server:\nAdd the location of the rose/cylc executables to $PATH \u0026nbsp; export PATH=/apps/jasmin/metomi/bin:$PATHJobs must be scheduled from the JASMIN server: cylc.jasmin.ac.uk\nAll users with a JASMIN login account can log in to this server.\nAccess to the Met Office Science Repository Service has also been set up. For information about authentication to the repositories see: https://code.metoffice.gov.uk/trac/home/wiki/AuthenticationCaching#JASMIN\nFollowing these instructions will give you access to FCM.\nIf you would like to run the cylc GUI then please login through the NoMachine servers.\nExample rose/cylc suite \u0026nbsp; Please see the JASMIN Workshop tutorial for a worked example of setting up a rose/cylc suite and run it on LOTUS.\nSetting up the \u0026ldquo;suite.rc\u0026rdquo; file for use with LOTUS \u0026nbsp; For use on JASMIN, you will need to configure the suite.rc to run on LOTUS (using the Slurm scheduling tool):\n[[job submission]] method = slurm execution time limit = PT15M [[directives]] -q = short-serial -W = 05:00 -n = 1"
      })
      .add(
      
      
      {
        id: 125,
        tag: "en",
        href: "/docs/uncategorized/working-with-many-linux-groups/",
        title: "Working with many Linux groups",
        description: "working with many Linux groups",
        
        
        content: "The number-of-groups limitation - and how to work around it\nDescription \u0026nbsp; On JASMIN, users are added to Linux groups for access to the group workspaces and CEDA datasets which they have registered to use, in addition to a couple of standard groups granted for all users.\nType the id command to see which groups you are a member of. The first one (shown with gid=) is your primary group, and the list starting groups= contains your supplementary groups.\nAlthough the Linux operating system allows the group list to contain a large number of supplementary groups, certain types of filesystem are subject to a maximum number that is supported. When such filesystems are accessed, a truncated copy of the group list may be used while deciding whether to grant read or write access to a given file or directory. This can mean that although a user is a member of the group which is needed, a permissions error still occurs, because the relevant group is being ignored. The groups which are ignored are those with the higher numerical group IDs.\nThe most significant limitation affecting JASMIN users is for filesystems which are mounted as type NFS, because this only supports 16 groups. In particular, this applies to the group workspaces that are optimised for small files (under path /gws/smf). It also applies to the home directories and /apps software directories, and although with these directories it is not normally necessary to restrict access via Linux groups, the restriction can affect for example access to the NAG library licence file for NERC users. The panfs filesystem type (Panasas group workspaces under /group_workspaces) is also affected in principle, but it has a limit of 32 groups, which is less likely to affect users.\nWorkarounds \u0026nbsp; newgrp \u0026nbsp; The newgrp program is available on all machines, and can be used to choose a particular group. For example, typing:\nnewgrp ukmo_climwill start a session (sub-shell) in which the primary group ID of the process is ukmo_clim (provided that you are already a member of that group). This will ensure that, in that session, you have access to any files which require that group. Note that it will also mean that any files and directories you create in that session will be owned by the group which you selected (although they can subsequently be changed with the chgrp command). When you exit from the sub-shell, you will be returned to the original session with your normal group list.\nThe main limitations of newgrp are that:\nIt only works interactively, so it is not possible to use it in LOTUS jobs. It only affects the primary group ID, so cannot be used to guarantee access to more than one group simultaneously, because some groups on the supplementary group list might still be ignored for filesystem accesses. Note that if newgrp prompts for a password, it is because you are trying to use it to access a group that you are not a member of (and then there is no password that you can usefully type).\nwithgroups \u0026nbsp; On the JASMIN scientific analysis machines running CentOS7, including the LOTUS nodes in the centos7 queue, a utility (written locally by CEDA) has been added, which overcomes the above mentioned limitations of the newgrp program. It is not available on the machines running RHEL6.\nTo use withgroups, you first need the following command (in your interactive session or shell script):\nmodule load jasmin-sciOnce you have done this, you can run any individual command with the syntax withgroups \u0026lt;group\u0026gt; \u0026lt;command\u0026gt; followed by any commands arguments, for example:\nwithgroups ukmo_clim ls /badc/ukmo-mslp/You can also use a comma-separated list of groups if a command requires more than one group, for example if you wanted to copy a file between group workspaces:\nwithgroups gws_foo,gws_bar cp /gws/smf/foo/myfile /gws/smf/bar/In these cases, the group list consists only of the specified groups. So if you specify a few additional groups, these should be safe from being ignored during filesystem access, because they are no longer part of a long list.\nNote that the group list in the calling session does not get modified. You will see this if for example you type:\nmodule load jasmin-sci # a reminder of the setup command id # \u0026#34;id\u0026#34; reports your whole list of groups withgroups ukmo_clim id # \u0026#34;id\u0026#34; only reports the \u0026#34;ukmo_clim\u0026#34; group id # again, \u0026#34;id\u0026#34; will show you the whole group listThis means that you should use withgroups on every command for which it is needed. If you prefer to use a subshell in which every command will have this group(s) list (for similar behaviour to newgrp) you could start it by doing something like:\nwithgroups ukmo_clim bash(You might see from the help message that the withgroups command includes a -a option to include all the original groups in the group list, just with the specified ones at the front. However, this option is not recommended for this purpose, because it turns out that filesystem access will ignore the ordering and still truncate the list in numerical order.)\nUse of workarounds with python (and other) programs \u0026nbsp; Note that there is no python module equivalent of either newgrp or withgroups. In most cases, it is sufficient to run your whole python script either inside a newgrp session or via withgroups, for example:\nwithgroups ukmo_clim python my_script.pyIn the unlikely event that your Python program needs access to a large number of groups, you will have to lauch external commands (using os.system or the subprocess package) that start with the relevant withgroups prefix.\nSimilar considerations apply to code written in other programming languages."
      })
      ;
  

  search.addEventListener('input', showResults, true);
}
  
function hideSuggestions(e) {
  var isClickInsideElement = suggestions.contains(e.target);

  if (!isClickInsideElement) {
    suggestions.classList.add('d-none')
    if (background !== null ) {
      background.style.setProperty('--image-opacity', '0.1')
    }
  }
}

/*
Source:
  - https://raw.githubusercontent.com/h-enk/doks/master/assets/js/index.js
*/
function inputFocus(e) {
  if (e.ctrlKey && e.key === '/' ) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' ) {
    search.blur();
    suggestions.classList.add('d-none');
  }
}

/*
Source:
  - https://dev.to/shubhamprakash/trap-focus-using-javascript-6a3
*/
function suggestionFocus(e) {
  const suggestionsHidden = suggestions.classList.contains('d-none');
  if (suggestionsHidden) return;

  const focusableSuggestions= [...suggestions.querySelectorAll('a')];
  if (focusableSuggestions.length === 0) return;

  const index = focusableSuggestions.indexOf(document.activeElement);

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const nextIndex = index > 0 ? index - 1 : 0;
    focusableSuggestions[nextIndex].focus();
  }
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex= index + 1 < focusableSuggestions.length ? index + 1 : index;
    focusableSuggestions[nextIndex].focus();
  }
}
  
/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/
function showResults() {
  const maxResult = 5;
  var searchQuery = this.value;
  // filter the results for the currently tagged language
  const lang = document.documentElement.lang;
  var results = null;
  if (searchQuery) {
    results = index.search(searchQuery, { index: ['title', 'description', 'content'], limit: maxResult, tag: lang, enrich: true });
    if (background !== null) {
      background.style.setProperty('--image-opacity', '0')
    }
  } else {
    if (background !== null) {
      background.style.setProperty('--image-opacity', '0.1')
    }
  }

  // flatten results since index.search() returns results for each indexed field
  const flatResults = new Map(); // keyed by href to dedupe results
  if (results !== null) {
    for (const result of results.flatMap(r => r.result)) {
      if (flatResults.has(result.doc.href)) continue;
      flatResults.set(result.doc.href, result.doc);
    }
  }

  suggestions.innerHTML = "";
  suggestions.classList.remove('d-none');
  
  // inform user that no results were found
  if (flatResults.size === 0 && searchQuery) {
    const msg = suggestions.dataset.noResults;
    const noResultsMessage = document.createElement('div')
    noResultsMessage.innerHTML = `${msg} "<strong>${searchQuery}</strong>"`
    noResultsMessage.classList.add("suggestion__no-results");
    suggestions.appendChild(noResultsMessage);
    return;
  }

  // construct a list of suggestions
  for (const [href, doc] of flatResults) {
    const entry = document.createElement('div');
    suggestions.appendChild(entry);

    const a = document.createElement('a');
    a.href = href;
    entry.appendChild(a);

    const title = document.createElement('span');
    title.classList.add('text-start');
    title.textContent = doc.title;
    title.classList.add("suggestion__title");
    a.appendChild(title);

    const description = document.createElement('span');
    description.textContent = doc.description;
    description.classList.add("suggestion__description");
    a.appendChild(description);

    suggestions.appendChild(entry);

    if (suggestions.childElementCount == maxResult) break;
  }
}
  
if (search !== null && suggestions !== null) {
  document.addEventListener('keydown', inputFocus);
  document.addEventListener('keydown', suggestionFocus);  
  document.addEventListener('click', hideSuggestions);
  initIndex();
}

const searchModal = document.getElementById('search-modal')
if (searchModal !== null) {
  searchModal.addEventListener('shown.bs.modal', function () {
    const searchInput = document.getElementById('search-input-modal')
    if (searchInput !== null) {
      searchInput.focus({ focusVisible: true })
    }
  })
}

;
document.querySelectorAll('.dynamic-svg').forEach((placeholder) => {
  placeholder.onload = function () {
    const container = placeholder.parentElement
    const doc = placeholder.contentDocument
    const attr = placeholder.getAttribute('data-class')
    const style = placeholder.getAttribute('data-style')

    if (container !== null && doc !== null) {
      const svg = doc.querySelector('svg')
      if (svg !== null) {
        svg.setAttribute('class', 'svg-inline--fa ' + (attr || ''))
        svg.setAttribute('fill', 'currentcolor')
        svg.setAttribute('aria-hidden', 'true')
        svg.setAttribute('role', 'img')
        if (style !== null && style !== '') {
          svg.setAttribute('style', style)
        }
        svg.removeAttribute('height')
        svg.removeAttribute('width')
        container.innerHTML = ''
        container.appendChild(svg)
      }
    }
  }
})

;
const navbar = document.querySelector('.navbar')
const togglers = document.querySelectorAll('.main-nav-toggler')
const modeSelectors = document.querySelectorAll('.switch-mode-collapsed')
const colorsBG = ['body', 'secondary', 'tertiary']

function updateNavbar () {
  if (window.scrollY > 75) {
    navbar.classList.add('nav-active')
    const storedTheme = localStorage.getItem('theme')
    navbar.setAttribute('data-bs-theme', storedTheme)
  } else {
    navbar.classList.remove('nav-active')
    const defaultTheme = navbar.getAttribute('data-bs-overlay')

    if (defaultTheme) {
      navbar.setAttribute('data-bs-theme', defaultTheme)
    }
  }
}

if ((navbar !== null) && (window.performance.getEntriesByType)) {
  if (window.performance.getEntriesByType('navigation')[0].type === 'reload') {
    updateNavbar()
  }
}

if (navbar !== null && togglers !== null) {
  // observe state changes to the site's color mode
  const html = document.querySelector('html')
  const config = {
    attributes: true,
    attributeFilter: ['data-bs-theme']
  }
  const Observer = new MutationObserver((mutationrecords) => {
    updateNavbar()
  })
  Observer.observe(html, config)

  // initialize background color
  const color = (navbar.getAttribute('data-navbar-color') || 'body')
  const bg = colorsBG.includes(color) ? `var(--bs-${color}-bg)` : `var(--bs-navbar-color-${color})`
  navbar.style.setProperty('--bs-navbar-expanded-color', bg)

  // set the navbar background color to opaque when scrolling past a breakpoint
  window.onscroll = () => {
    updateNavbar()
  }

  // set the navbar background color to opaque when expanded
  for (let i = 0; i < togglers.length; ++i) {
    togglers[i].onclick = () => {
      navbar.classList.toggle('navbar-expanded')
    }
  }

  // invoke the navbar toggler for each mode switcher to collapse the main menu afterwards
  for (let i = 0; i < modeSelectors.length; ++i) {
    modeSelectors[i].onclick = () => {
      for (let j = 0; j < togglers.length; ++j) {
        const toggler = togglers[j]
        if (toggler.getAttribute('aria-expanded') === 'true') {
          toggler.click()
        }
      }
    }
  }
}

;
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
// eslint-disable-next-line no-undef, no-unused-vars
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

;// Adapted from: https://dev.to/j471n/how-to-share-anything-from-your-website-by-web-share-api-1h5g

// function for Web Share API
function webShareAPI (title, description, link) {
  navigator
    .share({
      title,
      text: description,
      url: link
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error))
}

const shareBtn = document.getElementById('btn-webshare')

if (shareBtn !== null) {
  if (navigator.share) {
    const title = shareBtn.getAttribute('data-sharing-title')
    const description = shareBtn.getAttribute('data-sharing-description')
    const url = shareBtn.getAttribute('data-sharing-url')

    // show button if it supports webShareAPI
    shareBtn.style.display = 'block'
    shareBtn.addEventListener('click', () =>
      webShareAPI(title, description, url)
    )
  } else {
    // hide button if host does not support Web Share API
    shareBtn.style.display = 'none'
  }
};
// Script to move all embedded toast messages into a container with id 'toast-container'. The container ensures multiple
// toast messages are stacked properly. The script targets all elements specified by a 'data-toast-target' and ensures
// the click event of the origin is linked as well.

const container = document.getElementById('toast-container')
if (container !== null) {
  // process all data-toast-target elements
  document.querySelectorAll('[data-toast-target]').forEach(trigger => {
    const target = document.getElementById(trigger.getAttribute('data-toast-target'))
    if (target !== null) {
      // move the element to the toast containr
      container.appendChild(target)

      // eslint-disable-next-line no-undef
      const toast = bootstrap.Toast.getOrCreateInstance(target)
      if (toast !== null) {
        // associate the click event of the origin with the toast element
        trigger.addEventListener('click', () => {
          toast.show()
        })
      }
    }
  })
}

;
// Bootstrap tooltip example: https://getbootstrap.com/docs/5.2/components/tooltips/
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// eslint-disable-next-line no-unused-vars, no-undef
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
