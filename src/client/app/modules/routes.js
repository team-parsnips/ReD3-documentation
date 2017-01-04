import React from 'react';
import {match, Route} from 'react-router';
import Main from '../documentation/Main';
import Navigation from '../documentation/Navigation';
import Start from '../documentation/Start';
import VoronoiDoc from '../documentation/VoronoiDoc';
import SunburstDoc from '../documentation/SunburstDoc';
import ZoomMapDoc from '../documentation/ZoomMapDoc';
import ZoomCountiesMapDoc from '../documentation/ZoomCountiesMapDoc';
import HierarchicalDoc from '../documentation/HierarchicalDoc';
import DndTreeDoc from '../documentation/DndTreeDoc';
import PieDoc from '../documentation/PieDoc';
import CirclePackingDoc from '../documentation/CirclePackingDoc';
import ScatterPlotDoc from '../documentation/ScatterPlotDoc';

module.exports = (
  <Route component={Navigation}>
    <Route path='/' component={Main}/>
    <Route path='/start' component={Start}/>
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