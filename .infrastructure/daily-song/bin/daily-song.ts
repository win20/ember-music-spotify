#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DailySongStack } from '../lib/daily-song-stack';

const app = new cdk.App();
new DailySongStack(app, 'DailySongStack');
