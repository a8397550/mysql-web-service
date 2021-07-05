import {versionVerify} from '@/utils/version'
import Breadcrumb from 'element-ui/packages/breadcrumb';
import BreadcrumbItem from 'element-ui/packages/breadcrumb-item';

export const components = [
  Breadcrumb,
  BreadcrumbItem,
];

export default {
  install: function (app, opts = {size : undefined, zIndex : undefined}) {
    if (versionVerify('3.0.0', app.version) >= 0) {
      // locale.use(opts.locale);
      // locale.i18n(opts.i18n);


      components.forEach(component => {
        app.component(component.name, component);
      });

      // app.use(InfiniteScroll);
      // app.use(Loading.directive);

      app.config.globalProperties.$ELEMENT = {
        size: opts.size || '',
        zIndex: opts.zIndex || 2000
      };

      // app.config.globalProperties.$loading = Loading.service;
      // app.config.globalProperties.$msgbox = MessageBox;
      // app.config.globalProperties.$alert = MessageBox.alert;
      // app.config.globalProperties.$confirm = MessageBox.confirm;
      // app.config.globalProperties.$prompt = MessageBox.prompt;
      // app.config.globalProperties.$notify = Notification;
      // app.config.globalProperties.$message = Message;
      return;
    }
  }
}