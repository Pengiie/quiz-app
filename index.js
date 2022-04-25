/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import dotenv from 'dotenv'
dotenv.config();

AppRegistry.registerComponent(appName, () => App);
