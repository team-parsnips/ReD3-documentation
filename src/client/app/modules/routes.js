import React from 'react';
import {match, Route} from 'react-router';
import Main from '../documentation/Main.jsx';
import Navigation from '../documentation/Navigation.jsx';
import Start from '../documentation/Start.jsx';
import StackedBarDoc from '../documentation/StackedBarDoc.jsx';
import VoronoiDoc from '../documentation/VoronoiDoc.jsx';
import SunburstDoc from '../documentation/SunburstDoc.jsx';
import ZoomMapDoc from '../documentation/ZoomMapDoc.jsx';
import ZoomCountiesMapDoc from '../documentation/ZoomCountiesMapDoc.jsx';
import HierarchicalDoc from '../documentation/HierarchicalDoc.jsx';
import DndTreeDoc from '../documentation/DndTreeDoc.jsx';
import PieDoc from '../documentation/PieDoc.jsx';
import CirclePackingDoc from '../documentation/CirclePackingDoc.jsx';
import ScatterPlotDoc from '../documentation/ScatterPlotDoc.jsx';

module.exports = (
  <Route component={Navigation}>
    <Route path='/' component={Main}/>
    <Route path='/start' component={Start}/>
    <Route path='/stackedgroupedbar' component={StackedBarDoc}/>
    <Route path='/voronoi' component={VoronoiDoc}/>
    <Route path='/sunburst' component={SunburstDoc}/>
    <Route path='/zoommap' component={ZoomMapDoc}/>
    <Route path='/zoomcountiesmap' component={ZoomCountiesMapDoc}/>
    <Route path='/hierarchical' component={HierarchicalDoc}/>
    <Route path='/dndtree' component={DndTreeDoc}/>
    <Route path='/pie' component={PieDoc}/>
    <Route path='/circlepacking' component={CirclePackingDoc}/>
    <Route path='/scatterplot' component={ScatterPlotDoc}/>
  </Route>
);