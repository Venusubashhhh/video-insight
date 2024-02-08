import React from 'react'
import './KnownFace.scss'

import { useState } from 'react';
import ModalComponent from '../../components/photouploadmodal/PhotoModalComponent';
function Knownface() {
    
  return (
    <div>
        <div className='topbar'>
<h1>KnownFaces</h1>

<div style={{position:'absolute',top:'0px',right:'30px'}} >
<ModalComponent/>
</div>
        </div>
    <div className='wrapper'>

<div class="card-wrap">
  <div class="card-header two">
    <i class="fab fa-css3-alt"></i>
  </div>
  <div class="card-content">
    <h1 class="card-title">Title</h1>
   
 </div>
</div>
<div class="card-wrap">
  <div class="card-header two">
    <i class="fab fa-css3-alt"></i>
  </div>
  <div class="card-content">
    <h1 class="card-title">Title</h1>
   
 </div>
</div>
<div class="card-wrap">
  <div class="card-header two">
    <i class="fab fa-css3-alt"></i>
  </div>
  <div class="card-content">
    <h1 class="card-title">Title</h1>
   
 </div>
</div>
<div class="card-wrap">
  <div class="card-header four">
    <i class="fab fa-js-square"></i>
  </div>
  <div class="card-content">
    <h1 class="card-title">Title</h1>

 </div>
</div>

<div class="card-wrap">
  <div class="card-header four">
    <i class="fab fa-js-square"></i>
  </div>
  <div class="card-content">
    <h1 class="card-title">Title</h1>

 </div>
</div>


    </div>
    </div>
  )
}

export default Knownface