# Visual Diff - Angular 12 Form Validation Fix

## File: reactive-forms/src/app/app.component.html

### Change 1: Username Input Validation (Line 8)
```diff
-       <input type="text" [class.is-invalid]="userName.invalid && userName.touched" formControlName="userName" class="form-control">
+       <input type="text" [class.is-invalid]="userName?.invalid && userName?.touched" formControlName="userName" class="form-control">
```

### Change 2: Username Error Container (Line 10)
```diff
-       <div *ngIf="userName.invalid && userName.touched">
+       <div *ngIf="userName?.invalid && userName?.touched">
```

### Change 3: Username Required Error (Line 11)
```diff
-         <small class="text-danger" *ngIf="userName.errors?.required">Username is required</small>
+         <small class="text-danger" *ngIf="userName?.errors?.required">Username is required</small>
```

### Change 4: Username MinLength Error (Line 12)
```diff
-         <small class="text-danger" *ngIf="userName.errors?.minlength">Username must be at least 3 characters</small>
+         <small class="text-danger" *ngIf="userName?.errors?.minlength">Username must be at least 3 characters</small>
```

### Change 5: Username Forbidden Name Error (Line 13)
```diff
-         <small class="text-danger" *ngIf="userName.errors?.forbiddenName">'{{userName.errors?.forbiddenName.value}}' username not allowed</small>
+         <small class="text-danger" *ngIf="userName?.errors?.forbiddenName">'{{userName?.errors?.forbiddenName.value}}' username not allowed</small>
```

### Change 6: Email Input Validation (Line 31)
```diff
-       <input type="text" [class.is-invalid]="email.invalid && email.touched" formControlName="email" class="form-control">
+       <input type="text" [class.is-invalid]="email?.invalid && email?.touched" formControlName="email" class="form-control">
```

### Change 7: Email Error Message (Line 32)
```diff
-       <small class="text-danger" [class.d-none]="email.valid || email.untouched">Email is required</small>
+       <small class="text-danger" [class.d-none]="email?.valid || email?.untouched">Email is required</small>
```

### Change 8: Alternate Emails Array (Line 33)
```diff
-       <div formArrayName="alternateEmails" *ngFor="let email of alternateEmails.controls; let i=index">
+       <div formArrayName="alternateEmails" *ngFor="let email of alternateEmails?.controls; let i=index">
```

## Summary
- **Total Changes**: 8 lines modified
- **Pattern**: Added `?` after form control property access
- **Impact**: Fixes Angular 12+ strict null checking errors
- **Compatibility**: Backward compatible with Angular 9+

## Key Pattern
```
BEFORE: formControl.property
AFTER:  formControl?.property
```

This ensures safe property access when `formControl` might be `null` or `undefined`.
