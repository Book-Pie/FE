import { memo, useCallback, useRef } from "react";
import useDebounce from "hooks/useDebounce";
import * as Styled from "./style";
import * as Types from "./types";

const KEY_ENUM = {
  enter: "Enter",
  backspace: "Backspace",
  comma: "Comma",
};

const TAGS_MAX_COUNT = 5;
const TAGS_MAX_LENGTH = 20;

// 추가해야된다.
const SaleInsertTags = ({ tags, setForm }: any) => {
  const tagInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useDebounce();

  const tagClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { id } = e.currentTarget;
      if (tags.delete(id)) setForm(() => ({ tags: new Set([...Array.from(tags)]) }));
    },
    [tags, setForm],
  );

  const handlekeyDown = useCallback(() => {
    return (e: Types.KeyEvent) => {
      const { code, currentTarget } = e;
      const { id, value } = currentTarget;

      if (code === KEY_ENUM.backspace) {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
          setForm(prev => {
            const { tags } = prev;
            if (!tagInputRef.current) return prev;
            if (tags && tags.size !== 0 && tagInputRef.current.value === "") {
              const newSet = Array.from(tags).slice(0, tags.size - 1);
              return {
                tags: new Set([...newSet]),
              };
            }
            return prev;
          });
        }, 300);
      }

      if (code === KEY_ENUM.comma && tagInputRef.current) {
        // 입력으로 들어온 콤마 무효 시키기
        e.preventDefault();
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          setForm(prev => {
            if (value === "") return prev;
            if (!prev.tags) return { tags: new Set([value]) };
            if (prev.tags.has(value)) return prev;
            if (prev.tags.size === TAGS_MAX_COUNT) return prev;
            if (value.length > TAGS_MAX_LENGTH) return prev;
            const tags = new Set([...Array.from(prev.tags), value]);
            return { ...prev, [id]: tags };
          });
        }, 100);

        tagInputRef.current.value = "";
      }
    };
  }, [debounceRef, setForm]);

  const handlekeyPress = useCallback(() => {
    return (e: Types.KeyEvent) => {
      const { code, currentTarget } = e;
      if (code === KEY_ENUM.enter && tagInputRef.current) {
        e.preventDefault();
        const { id, value } = currentTarget;
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
          setForm(prev => {
            if (value === "") return prev;
            // 첫 등록
            if (!prev.tags) return { tags: new Set([value]) };
            // 동일한 내용이 있다면 태그 추가를 안합니다.
            if (prev.tags.has(value)) return prev;
            // 태그 갯수 조절.
            if (prev.tags.size === TAGS_MAX_COUNT) return prev;
            if (value.length > TAGS_MAX_LENGTH) return prev;
            const tags = new Set([...Array.from(prev.tags), value]);
            return { ...prev, [id]: tags };
          });
        }, 100);
        tagInputRef.current.value = "";
      }
    };
  }, [debounceRef, setForm]);

  return (
    <Styled.Row>
      <div>
        <span>연관태그</span>
        <span />
      </div>
      <Styled.TagBox>
        {Array.from(tags).map((tag, idx) => (
          <Styled.Tag key={idx} onClick={tagClick} id={tag}>
            {`#${tag}`}
          </Styled.Tag>
        ))}
        <input
          type="text"
          id="tags"
          placeholder="태그를 입력해주세요."
          autoComplete="off"
          ref={tagInputRef}
          onKeyDown={handlekeyDown()}
          onKeyPress={handlekeyPress()}
        />
        <Styled.InputMessage>
          {tags.size !== 5 ? (
            <div>
              <span>쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다.</span>
              <span> 등록된 태그를 클릭하면 삭제됩니다.</span>
            </div>
          ) : (
            <div>
              <span>태그는 최대 {TAGS_MAX_COUNT}개 까지 등록 가능합니다.</span>
            </div>
          )}
        </Styled.InputMessage>
      </Styled.TagBox>
    </Styled.Row>
  );
};

export default memo(SaleInsertTags);
