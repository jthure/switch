# switch-stmt

## Overview

This package provides a simple way of writing switch statement logic with function chaining.

## Installation

To install the package, use the following command in your project directory:

```bash
npm install switch-stmt
```

## Usage

### Importing

First, import the `switchOn` function from the package:

```typescript
import { switchOn } from 'switch-stmt';
```

### Basic Example

Here's a simple example of usage:

```typescript
const result = switchOn(yourValue)
  .case('value1', () => 'Result for value1')
  .case('value2', 'Result for value2')
  .default(() => 'Default result')
  .eval();
```

## License

This project is licensed under MIT.

