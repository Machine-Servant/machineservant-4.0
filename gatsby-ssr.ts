import { PluginOptions, RenderBodyArgs } from 'gatsby';
const HtmlAttributes = { lang: 'en-US' };

export const onRenderBody = (
  { setHtmlAttributes }: RenderBodyArgs,
  pluginOptions: PluginOptions
) => {
  setHtmlAttributes(HtmlAttributes);
};
