import { renderHook, act } from '@testing-library/react';
import { faker } from '@faker-js/faker';

import useField from '../../../src/hooks/useField';

describe('useField', () => {
  it('should provide a type, value, and change handler', () => {
    const { result } = renderHook(() => useField('text'));

    expect(result.current.type).toBe('text');
    expect(result.current.value).toBe('');
    expect(typeof result.current.onChange).toBe('function');
  });

  it('should have default type of \'text\'', () => {
    const { result } = renderHook(() => useField());

    expect(result.current.type).toBe('text');
  });

  it('should update value when user types into input', () => {
    const gibberish = faker.word.noun();

    // If arg doesn't change, pass value in hook call like here
    // If custom hook has built-in hooks with dependency arrays,
    // and the arg needs to change when the hook is evoked, use
    // initialProps and rerender func to update arg instead
    const { result } = renderHook(() => useField('text'));

    // Any updates to state are applied before assertions when using *act*
    // If you need to wait (data fetching, etc), then *await waitForNextUpdate()*
    act(() => result.current.onChange({ target: { value: gibberish } }));
    expect(result.current.value).toBe(gibberish);
  });
});
