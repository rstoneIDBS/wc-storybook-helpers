import { TemplateResult } from 'lit';
import { ArgTypes } from './storybook';
import { getStyleTemplate, getTemplate } from './html-templates.js';
import {
  getAttributes,
  getComponentByTagName,
  getCssParts,
  getCssProperties,
  getProperties,
  getReactEvents,
  getReactProperties,
  getSlots,
} from './cem-utilities.js';
import { Declaration } from './cem-schema';

export function getWcStorybookHelpers(tagName: string, cem: any) {
  const component = getComponentByTagName(tagName, cem);
  const eventNames = component?.events?.map(event => event.name) || [];

  return {
    argTypes: getArgTypes(component),
    reactArgTypes: getReactProps(component),
    events: eventNames,
    styleTemplate: (args?: any) => getStyleTemplate(component, args),
    template: (args?: any, slot?: TemplateResult) => getTemplate(component, args, slot),
  };
}

export function getArgTypes(component?: Declaration): ArgTypes {
  const argTypes: ArgTypes = {
    ...getAttributes(component),
    ...getProperties(component),
    ...getCssProperties(component),
    ...getCssParts(component),
    ...getSlots(component),
  };

  return argTypes;
}

function getReactProps(component?: Declaration): ArgTypes {
  const argTypes: ArgTypes = {
    ...getReactProperties(component),
    ...getReactEvents(component),
  };

  // console.log(component?.tagName, argTypes);

  return argTypes;
}
