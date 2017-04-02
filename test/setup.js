/**
 * Created by Liming on 2017/4/2.
 */
"use strict";
import { jsdom } from 'jsdom';

global.document = jsdom(`<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
</head>
<body>
</body>
</html>`);
global.window = document.defaultView;
global.navigator = global.window.navigator;
