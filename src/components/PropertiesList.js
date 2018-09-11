import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropertyCard from "./PropertyCard";
import { fetchProperties } from "../actions/index";
import { firestoreConnect } from "react-redux-firebase";
import { Card } from "semantic-ui-react";
import PropertSearchForm from '../features/propertySearch/PropertySearchForm'

class PropertiesList extends Component {
   // componentDidMount() {
   //    this.props.fetchProps();
   // }

   renderList = () => {
      // debugger
      if (this.props.properties && this.props.search.length == []) {
         return this.props.properties.map(prop => {
            return <PropertyCard prop={prop} key={prop.id} name={prop.name} />;
         });
      } else {
         return this.props.search.map(prop => {
            return <PropertyCard prop={prop} key={prop.id} name={prop.name} />;
         });
      }
   };

   render() {

      return  <div>
            <div style={{width:'640px'}}>
               <PropertSearchForm />
            </div>
            <div style={{paddingTop: '20px'}}>
            <Card.Group>{this.renderList()}</Card.Group>
            </div>
            </div>
   }
}

function mapStateToProps(state) {
   return {
      properties: state.firestore.ordered.properties,
      search: state.search
   };
}
function mapDispatchToProps(dispatch) {
   return {
      fetchProps: () => dispatch(fetchProperties())
   };
}
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(firestoreConnect([{ collection: "properties" }])(PropertiesList));