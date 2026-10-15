import { addTrailingSlash, removeTrailingSlash, TrailingSlashUrlSerializer } from './trailing-slash.serializer';

describe('addTrailingSlash', () => {
  it('adds the slash before the query and the fragment', () => {
    expect(addTrailingSlash('/privacy')).toBe('/privacy/');
    expect(addTrailingSlash('/privacy?a=1#b')).toBe('/privacy/?a=1#b');
    expect(addTrailingSlash('/#features')).toBe('/#features');
    expect(addTrailingSlash('/')).toBe('/');
  });
});

describe('removeTrailingSlash', () => {
  it('keeps the root and strips the slash before the query and the fragment', () => {
    expect(removeTrailingSlash('/')).toBe('/');
    expect(removeTrailingSlash('/privacy/')).toBe('/privacy');
    expect(removeTrailingSlash('/privacy/?a=1#b')).toBe('/privacy?a=1#b');
    expect(removeTrailingSlash('/#features')).toBe('/#features');
  });
});

describe('TrailingSlashUrlSerializer', () => {
  const serializer = new TrailingSlashUrlSerializer();

  it('parses the trailing slash without an empty segment', () => {
    const segments = (url: string) => serializer.parse(url).root.children['primary']?.segments.map((segment) => segment.path);

    expect(segments('/delete-account/')).toEqual(['delete-account']);
    expect(segments('/delete-account/?a=1#b')).toEqual(['delete-account']);
    expect(serializer.parse('/privacy/#who-we-are').fragment).toBe('who-we-are');
    expect(segments('/')).toBeUndefined();
  });

  it('parses URLs with and without the slash to the same tree', () => {
    expect(serializer.serialize(serializer.parse('/support/'))).toBe('/support/');
    expect(serializer.serialize(serializer.parse('/support'))).toBe('/support/');
  });
});
