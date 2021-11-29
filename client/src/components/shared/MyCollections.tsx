import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { listCollectionsUser } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Table, Image } from 'react-bootstrap';
import { Message, Loader } from 'components/shared';
import MainLayout from 'layouts/MainLayout';
import { RouteComponentProps } from 'react-router-dom';
import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';

const MyCollections = () => {
    return (
        <div>
            
        </div>
    )
}

export default MyCollections
