import React, { useState } from 'react';
import {
  Heart,
  Share2,
  Camera,
  Instagram,
  MessageCircle,
  Twitter,
  Facebook,
  Copy,
  Check,
  Send,
  X,
  Star,
  Sparkles
} from 'lucide-react';
import { GUEST_STORIES } from '../data/hotelData';
import { GuestStory } from '../types';
import { getAssetUrl } from '../utils/assetUrl';

interface SocialHubProps {
  onSelectPhotoToShare?: (item: any) => void;
  onBookSuite?: () => void;
}

export const SocialHub: React.FC<SocialHubProps> = ({ onBookSuite }) => {
  const [stories, setStories] = useState<GuestStory[]>(() => {
    const saved = localStorage.getItem('meridian_blu_guest_stories_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return GUEST_STORIES;
  });

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeStoryToShare, setActiveStoryToShare] = useState<GuestStory | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // New Story Creator Form State
  const [newGuestName, setNewGuestName] = useState('');
  const [newHandle, setNewHandle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newTag, setNewTag] = useState('#WinterlinePatron');
  const [newPhotoUrl, setNewPhotoUrl] = useState(getAssetUrl('/images/terrace.jpg'));

  const presetPhotos = [
    { label: 'Mountain Terrace', url: getAssetUrl('/images/terrace.jpg') },
    { label: 'Evening Bonfire', url: getAssetUrl('/images/bonefire.jpg') },
    { label: 'Alpine Dining', url: getAssetUrl('/images/restaurant.jpg') },
    { label: 'Balcony Suite', url: getAssetUrl('/images/Summit Balcony Room/Summit Balcony Room.avif') },
  ];

  const handleToggleLike = (id: string) => {
    const updated = stories.map((s) => {
      if (s.id === id) {
        const nextLiked = !s.liked;
        return {
          ...s,
          liked: nextLiked,
          likes: nextLiked ? s.likes + 1 : s.likes - 1,
        };
      }
      return s;
    });
    setStories(updated);
    localStorage.setItem('meridian_blu_guest_stories_v1', JSON.stringify(updated));
  };

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) return;

    const newStory: GuestStory = {
      id: 'story-' + Date.now(),
      guestName: newGuestName.trim() || 'Distinguished Patron',
      guestHandle: newHandle.trim().startsWith('@') ? newHandle.trim() : '@' + (newHandle.trim() || 'himalayan_patron'),
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      location: 'Mussoorie, Uttarakhand',
      timestamp: 'Just now',
      rating: 5,
      badge: newTag.replace('#', ''),
      caption: `${newCaption} ${newTag} #MeridianBluMussoorie`,
      imageUrl: newPhotoUrl,
      likes: 1,
      liked: true,
    };

    const nextStories = [newStory, ...stories];
    setStories(nextStories);
    localStorage.setItem('meridian_blu_guest_stories_v1', JSON.stringify(nextStories));

    setNewCaption('');
    setNewGuestName('');
    setNewHandle('');
    setIsShareModalOpen(false);

    setActiveStoryToShare(newStory);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://meridianblu.com';
  const getShareText = (story?: GuestStory | null) => {
    if (story) {
      return `"${story.caption}" — Recorded at Meridian Blu Mussoorie, Himalayan Luxury Sanctuary:`;
    }
    return 'Mountain grandeur and hearthside luxury at Meridian Blu Mussoorie (7,120 ft elevation):';
  };

  const handleShareWhatsApp = (story?: GuestStory | null) => {
    const text = encodeURIComponent(`${getShareText(story)} ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = (story?: GuestStory | null) => {
    const text = encodeURIComponent(getShareText(story));
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}&hashtags=MeridianBluMussoorie,Himalayas,Mussoorie`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <section id="stories" className="py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-700 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Distinguished Patron Chronicles</span>
              <span aria-hidden="true">·</span>
              <span>Verified Guest Memoirs</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 [text-wrap:balance]">
              Himalayan Memoirs & Patron Chronicles
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Memories observed beneath radiant winterline twilights and ancient pine forests. Transmit your estate chronicles directly to your private and professional social channels.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Record Residence Memory</span>
            </button>
          </div>
        </div>

        {/* Stories Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={story.imageUrl}
                    alt={story.guestName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Badge tag */}
                  <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-blue-900 shadow-sm">
                    #{story.badge}
                  </div>
                </div>

                {/* Author Info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={story.avatarUrl}
                        alt={story.guestName}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border-2 border-blue-600/30 shadow-sm"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">{story.guestName}</h4>
                        <span className="text-xs text-slate-500">{story.guestHandle}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-400">
                      {[...Array(story.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {story.caption}
                  </p>

                  <div className="text-xs text-slate-400 pt-2 flex items-center justify-between">
                    <span>{story.location}</span>
                    <span>{story.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Card Social Actions Bar */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                <button
                  onClick={() => handleToggleLike(story.id)}
                  className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                    story.liked ? 'text-rose-600 font-semibold' : 'text-slate-500 hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${story.liked ? 'fill-current text-rose-600' : ''}`} />
                  <span className="font-mono tabular-nums">{story.likes}</span>
                </button>

                <button
                  onClick={() => setActiveStoryToShare(story)}
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Share Chronicle</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Story Creator Modal */}
        {isShareModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setIsShareModalOpen(false)}
          >
            <div
              className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 text-xs shadow-2xl text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2 text-slate-900">
                  <Camera className="w-5 h-5 text-blue-700" />
                  <h3 className="font-serif text-xl font-bold">Record Imperial Residence Chronicle</h3>
                </div>
                <button onClick={() => setIsShareModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateStory} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1 uppercase tracking-wider font-semibold text-[10px]">Patron Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Radhika Singh"
                      value={newGuestName}
                      onChange={(e) => setNewGuestName(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 uppercase tracking-wider font-semibold text-[10px]">Social Handle</label>
                    <input
                      type="text"
                      placeholder="@radhika_singh"
                      value={newHandle}
                      onChange={(e) => setNewHandle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 uppercase tracking-wider font-semibold text-[10px]">Select Residence Vignette</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {presetPhotos.map((preset, idx) => (
                      <div
                        key={idx}
                        onClick={() => setNewPhotoUrl(preset.url)}
                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all h-16 relative ${
                          newPhotoUrl === preset.url ? 'border-blue-600 ring-2 ring-blue-400/40' : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[9px] text-center text-white truncate py-0.5">
                          {preset.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 uppercase tracking-wider font-semibold text-[10px]">Designated Chronicle Tag</label>
                  <div className="flex flex-wrap gap-2">
                    {['#WinterlinePatron', '#EstateSerenity', '#GeorgeEverestExcursion', '#ImperialMussoorie', '#LandourHeritage'].map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => setNewTag(tag)}
                        className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                          newTag === tag
                            ? 'bg-blue-700 text-white font-semibold shadow-sm'
                            : 'bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 uppercase tracking-wider font-semibold text-[10px]">Patron Memoir</label>
                  <textarea
                    rows={3}
                    placeholder="Document your perspective on the mountain twilight, hearthside warmth, or estate hospitality..."
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Publish to Patron Chronicles</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Direct Social Media Share Intent Modal */}
        {activeStoryToShare && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setActiveStoryToShare(null)}
          >
            <div
              className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 text-xs shadow-2xl text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2 text-slate-900">
                  <Share2 className="w-5 h-5 text-blue-700" />
                  <h3 className="font-serif text-xl font-bold">Transmit to Social Channels</h3>
                </div>
                <button onClick={() => setActiveStoryToShare(null)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Story Mini Preview */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
                <img
                  src={activeStoryToShare.imageUrl}
                  alt="Story preview"
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="overflow-hidden">
                  <span className="font-bold text-slate-900 block truncate">{activeStoryToShare.guestName}</span>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{activeStoryToShare.caption}</p>
                </div>
              </div>

              {/* Direct Targets */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Select Platform Destination</span>
                
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => handleShareWhatsApp(activeStoryToShare)}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition-all cursor-pointer font-medium"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(activeStoryToShare.caption);
                      alert('Chronicle citation copied to clipboard. You may now post directly to Instagram.');
                    }}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 transition-all cursor-pointer font-medium"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>Instagram</span>
                  </button>

                  <button
                    onClick={() => handleShareTwitter(activeStoryToShare)}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 transition-all cursor-pointer font-medium"
                  >
                    <Twitter className="w-4 h-4 text-sky-600" />
                    <span>X (Twitter)</span>
                  </button>

                  <button
                    onClick={handleShareFacebook}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 transition-all cursor-pointer font-medium"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>

              {/* Copy Direct Link */}
              <div className="pt-2">
                <button
                  onClick={handleCopyLink}
                  className="w-full py-3 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-2xl text-xs text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer font-semibold"
                >
                  {copySuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Chronicle Link Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-blue-700" />
                      <span>Copy Direct Shareable Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
