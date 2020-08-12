import { combineLatest } from "rxjs";

import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { timeoutWith } from "rxjs/operators";
import { of } from "rxjs";

export function unique(debounceTimeout, timeoutValue, ...otherSources) {
  return combineLatest(...otherSources).pipe(
    debounceTime(debounceTimeout),
    distinctUntilChanged()
    // timeoutWith(timeoutValue, of([]))
  );
}
