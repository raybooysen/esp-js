// notice_start
/*
 * Copyright 2015 Dev Shop Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 // notice_end

import { Guard } from '../system';
import Observer from './Observer';

export default class Observable {
    static create(onObserve) {
        Guard.lengthIs(arguments, 1, "Incorrect argument count on Observable, expect 1 onObserve function");
        var observe =  observer => {
            return onObserve(observer);
        };
        return new Observable(observe);
    }
    constructor(observe) {
        this._observe = observe;
    }
    observe() {
        var observer;
        if(arguments.length === 1 && arguments[0] instanceof Observer) {
            observer = arguments[0];
        } else {
            Guard.lengthIsAtLeast(arguments, 1, "Incorrect args count of " + arguments.length);
            var onNext = arguments[0];
            var onCompleted = arguments.length >= 1 ? arguments[1] : undefined;
            observer = new Observer(onNext, onCompleted);
        }
        Guard.isDefined(this._observe, '_observe not set');
        return this._observe(observer);
    }
}