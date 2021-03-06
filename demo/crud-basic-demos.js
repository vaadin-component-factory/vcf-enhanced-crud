import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class CrudBasicDemos extends DemoReadyEventEmitter(CrudDemo(PolymerElement)) {
  static get template() {
    return html`
    <style include="vaadin-component-demo-shared-styles">
      :host {
        display: block;
      }
    </style>

    <h3>Basics</h3>
    <p>An array of objects can be assigned to the <code>items</code> property.</p>
    <vaadin-demo-snippet id="crud-basic-demos-basics">
      <template preserve-content="">
        <vaadin-crud></vaadin-crud>
        <script>
          window.addDemoReadyListener('#crud-basic-demos-basics', function(document) {
            /* window.users is an array of objects with the following structure:
            [{
              _id: '…',
              name: {first: '…', last: '…'},
              details: {picture: '', email: '…'},
              password: '…',
              role: '…'
            }, ... ] */
            document.querySelector('vaadin-crud').items = window.users;
          });
        &lt;/script>
      </template>
    </vaadin-demo-snippet>

    <h3>Include fields</h3>
    <p>Grid columns and editor fields can be defined by providing a list of fields in the <code>include</code> property.</p>
    <p><i>NOTE: </i>When there is no initial data, use this to configure grid and editor, then you can add new items</p>
    <vaadin-demo-snippet id="crud-basic-demos-include">
      <template preserve-content="">
        <vaadin-crud include="name.first, name.last, details.email, role"></vaadin-crud>
        <script>
          window.addDemoReadyListener('#crud-basic-demos-include', function(document) {
            document.querySelector('vaadin-crud').items = window.users;
          });
        &lt;/script>
      </template>
    </vaadin-demo-snippet>

    <h3>Exclude fields</h3>
    <p>Otherwise you can exclude a set of fields by using the the <code>exclude</code> property.</p>
    <p><i>NOTE: </i>When the <code>include</code> property is set <code>exclude</code> is ignored</p>
    <vaadin-demo-snippet id="crud-basic-demos-exclude">
      <template preserve-content="">
        <vaadin-crud exclude="_id, password, picture"></vaadin-crud>
        <script>
          window.addDemoReadyListener('#crud-basic-demos-exclude', function(document) {
            document.querySelector('vaadin-crud').items = window.users;
          });
        &lt;/script>
      </template>
    </vaadin-demo-snippet>

    <h3>Disable sorting and filtering</h3>
    <p>Built-in sorting and filtering can be disabled by setting the properties <code>no-sort</code> and <code>no-filter</code> respectively</p>
    <vaadin-demo-snippet id="crud-basic-demos-no-filter">
      <template preserve-content="">
        <vaadin-crud no-sort="" no-filter="" include="name.first, name.last, details.email, role"></vaadin-crud>
        <script>
          window.addDemoReadyListener('#crud-basic-demos-no-filter', function(document) {
            document.querySelector('vaadin-crud').items = window.users;
          });
        &lt;/script>
      </template>
    </vaadin-demo-snippet>

    <h3>Edit items with row click</h3>
    <p>By setting <code>edit-on-click</code> to <code>true</code>, items can be opened to edit by clicking on the grid row.</p>
    <p><i>NOTE:</i> When enabled, the edit column on autogenerated grid is hidden.</p>
    <vaadin-demo-snippet id="crud-basic-demos-click-row">
      <template preserve-content="">
        <vaadin-crud edit-on-click=""></vaadin-crud>
        <script>
          window.addDemoReadyListener('#crud-basic-demos-click-row', function(document) {
            /* window.users is an array of objects with the following structure:
            [{
              _id: '…',
              name: {first: '…', last: '…'},
              details: {picture: '', email: '…'},
              password: '…',
              role: '…'
            }, ... ] */
            document.querySelector('vaadin-crud').items = window.users;
          });
        &lt;/script>
      </template>
    </vaadin-demo-snippet>
`;
  }

  static get is() {
    return 'crud-basic-demos';
  }
}
customElements.define(CrudBasicDemos.is, CrudBasicDemos);
