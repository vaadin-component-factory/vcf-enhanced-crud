import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class CrudDataDemos extends DemoReadyEventEmitter(CrudDemo(PolymerElement)) {
  static get template() {
    return html`
    <style include="vaadin-component-demo-shared-styles">
      :host {
        display: block;
      }
    </style>

    <h3>Data Provider</h3>
    <p>A function can be assigned to the <code>dataProvider</code> property in order to set a custom data source.</p>
    <p>NOTE: it is responsability of this dataProvider function to execute the <code>callback</code> providing the appropriate
      filtered and sorted chunk of items, as well as the total size of the data set.</p>
    <p>This example utilises an array as its data storage. The <code>dataProvider</code> function is able to extract
      chunks from the array based on the <code>params</code> argument</p>
    <p>Listen to <code>save</code> and <code>delete</code> events to persist changes in the database</p>
    <vaadin-demo-snippet id="crud-data-demos-dataprovider">
      <template preserve-content="">
        <vaadin-crud></vaadin-crud>
        <script>

        /** CRUD CONFIGURATION **/
        window.addDemoReadyListener('#crud-data-demos-dataprovider', function(document) {
          const crud = document.querySelector('vaadin-crud');
          // Configure CRUD Read
          crud.dataProvider = function(params, callback) {
            const arr = sort(filter(people, params.filters), params.sortOrders);
            const chunk = arr.slice(params.page * params.pageSize, params.page * params.pageSize + params.pageSize);
            callback(chunk, arr.length);
          };
          // Configure CRUD Create and Update
          crud.addEventListener('save', function(e) {
            const item = e.detail.item;
            // Set the unique id in case of a new item
            if (item._id) {
              people[getIdx(people, item)] = item;
            } else {
              item._id = id++;
              people.push(item);
            }
          });
          // Configure CRUD Delete
          crud.addEventListener('delete', function(e) {
            people.splice(getIdx(people, e.detail.item), 1);
          });
        });

        /** DATA MODEL **/
        // Generates an array of people
        for (var people = [], id = 0; id <= 200; id++) {
          people.push({
            '_id': id, // It's a good practice to provide data with unique ids
            'first': ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer'][id % 6] + id,
            'last': ['Smith', 'Johnson', 'Williams', 'Brown'][id % 4]});
        }
        // Helper to get the index of an item with unique \`_id\` in an array
        function getIdx(array, item) {
          return array.reduce(function(r, obj, idx) {
            return (r < 0 && obj._id === item._id) ? idx : r;
          }, -1);
        }
        // Helper to filter an array based on the \`param.filters\` array
        function filter(array, filters) {
          return array.filter(function(item) {
            return filters.every(function(f) {
              return RegExp(f.value, 'i').test(Polymer.Base.get(f.path, item));
            });
          });
        }
        // Helper to sort an array based on the \`param.sortOrders\` array
        function sort(array, sorts) {
          return array.slice(0).sort(function(item1, item2) {
            return sorts.reduce(function(r, s) {
              const a = Polymer.Base.get(s.path, s.direction == 'asc' ? item1 : item2) || '';
              const b = Polymer.Base.get(s.path, s.direction == 'asc' ? item2 : item1) || '';
              return r > 0 || a.localeCompare(b);
            }, 0);
          });
        }
        &lt;/script>
      </template>
    </vaadin-demo-snippet>
`;
  }

  static get is() {
    return 'crud-data-demos';
  }
}
customElements.define(CrudDataDemos.is, CrudDataDemos);
