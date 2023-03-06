export default function CAQResult({
    name = "",
    lastValue = "",
    displayName = "",
    unit = "",
    lastUpdated = "",
    }) {
    return (
      <div className="caqresult">
        {name}:&nbsp;<b>{lastValue}&nbsp;{displayName}&nbsp;{unit}</b>&nbsp;&#64;{lastUpdated}<br/>
      </div>
    );
  }
  