/* eslint-disable */
import { renderHook, waitFor } from '@testing-library/react';
import axiosMock from 'axios';
import { faker } from '@faker-js/faker';

import useCountry from '../../../src/hooks/useCountry';

jest.mock('axios');

// Reset mock usage and implementation after each test
afterEach(() => jest.resetAllMocks());

describe('useCountry', () => {
  it('should return null by default', () => {
    const { result } = renderHook(() => useCountry(''));

    expect(result.current).toBeNull();
  });

  describe('if successful', () => {
    it('should return data and status of found', async () => {
      const country = faker.location.country();
      const mockResponse = { data: [{ name: country }] };
      axiosMock.get.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useCountry(country));

      await waitFor(() => expect(result.current).not.toBeNull());

      expect(result.current).toEqual({
        data: { name: country },
        found: true,
      });
    });

    it('should return new data when passed a new country name', async () => {
      const country = faker.location.country();
      const anotherCountry = faker.location.country();
      axiosMock.get
        .mockResolvedValueOnce({ data: [{ name: country }] })
        .mockResolvedValueOnce({ data: [{ name: anotherCountry }]});

      // initialProps ===> renderHook cb arg ===> customHook arg
      // rerender arg ===> new renderHook cb arg ===> new customHook arg
      const { result, rerender } = renderHook(({ country }) => useCountry(country), {
        initialProps: { country },
      });

      await waitFor(() => expect(result.current).not.toBeNull());

      expect(result.current).toEqual({
        data: { name: country },
        found: true,
      });

      rerender({ country: anotherCountry });

      // Wait until the data has been updated before asserting on new values
      await waitFor(() => expect(result.current.data.name).not.toBe(country));

      expect(result.current).toEqual({
        data: { name: anotherCountry },
        found: true,
      });
    });
  })

  describe('if error', () => {
    it('should return null data and status of not found', async () => {
      const country = faker.location.country();
      axiosMock.get.mockRejectedValue(new Error());

      const { result } = renderHook(() => useCountry(country));

      await waitFor(() => expect(result.current).not.toBeNull());

      expect(result.current).toEqual({
        data: null,
        found: false,
      });
    });
  });
});
