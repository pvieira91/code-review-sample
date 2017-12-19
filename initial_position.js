## Option 1
 private handleInitialGoto = () => {
  if (!this.props.initialPosition) {
    return;
  }
 
  interface GotoHandler {
    canGo: () => void;
    go: () => void;
  }
 
  const {
    docId,
    charOffset,
    href,
    pageIdx,
    pageName,
    location
  } = this.props.initialPosition;
 
  const { searchTerm } = this.props;
 
  const gotoSearchResult: GotoHandler = {
    canGo: () => searchTerm && docId && charOffset !== undefined,
    go: () => {
      this.reader.gotoDocCharOffset(docId, charOffset);
    }
  };
 
  const gotoHref: GotoHandler = {
    canGo: () => !!href,
    go: () => this.reader.gotoHref(href)
  };
 
  const gotoDocId: GotoHandler = {
    canGo: () => !!docId,
    go: () => this.reader.gotoPosition(docId, location)
  };
 
  const gotoPageIdx: GotoHandler = {
    canGo: () => pageIdx !== undefined,
    go: () => this.reader.gotoPageIndex(pageIdx)
  };
 
  const gotoPageName: GotoHandler = {
    canGo: () => !!pageName,
    go: () => this.reader.gotoPageName(pageName)
  };
 
  const gotoHandler = find(
   // goto Handlers ordered by priority
    [gotoSearchResult, gotoHref, gotoDocId, gotoPageIdx, gotoPageName],
    gotoHandler => gotoHandler.canGo()
  );
 
  if (gotoHandler) {
    gotoHandler.go();
  }
};
 
 
 
## Option 2
private handleInitialGoto = () => {
  if (this.props.initialPosition !== undefined) {
    const pip = this.props.initialPosition;
 
    if (pip.href !== undefined) {
      this.reader.gotoHref(pip.href);
    } else if (
      this.props.searchTerm &&
      pip.docId &&
      pip.charOffset !== undefined
    ) {
      this.reader.gotoDocCharOffset(pip.docId, pip.charOffset);
    } else if (pip.docId !== undefined) {
      this.reader.gotoPosition(pip.docId, pip.location);
    } else if (pip.pageIdx !== undefined) {
      this.reader.gotoPageIndex(pip.pageIdx);
    } else if (pip.pageName !== undefined) {
      this.reader.gotoPageName(pip.pageName);
    }
  }
};