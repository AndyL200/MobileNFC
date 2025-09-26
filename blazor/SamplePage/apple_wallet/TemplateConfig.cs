using System;

namespace apple_wallet
{
    public class TemplateConfig
    {
        public string templateId { get; set; }
        public string templateName { get; set; }
        public bool templatePublic { get; set; }
        public string passConstructor { get; set; }
        public DateTime templateUpdated { get; set; }
        public int templateHash { get; set; }
    }
}