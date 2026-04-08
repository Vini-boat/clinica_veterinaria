const DiagramEmbed = ({ embedUrl }: { embedUrl: string }) => {
  return (
    <div className="w-full h-[600px] border border-gray-200 rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

export default DiagramEmbed;